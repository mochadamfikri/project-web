"""Endpoint autentikasi admin/staf (dan nantinya pelanggan)."""
from fastapi import APIRouter, HTTPException, Request, Response, Depends

from auth import (
    verify_password, create_access_token, create_refresh_token,
    set_auth_cookies, clear_auth_cookies, get_current_user,
)
from models import LoginRequest, UserPublic

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=UserPublic)
async def login(payload: LoginRequest, response: Response):
    from server import db
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not user.get("aktif", True):
        raise HTTPException(status_code=401, detail="Email atau kata sandi salah")
    if not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Email atau kata sandi salah")

    token_version = user.get("token_version", 0)
    access = create_access_token(user["id"], user["email"], user["role"], token_version)
    refresh = create_refresh_token(user["id"], token_version)
    set_auth_cookies(response, access, refresh)

    return UserPublic(**user)


@router.post("/logout")
async def logout(response: Response):
    clear_auth_cookies(response)
    return {"message": "Berhasil keluar"}


@router.get("/me", response_model=UserPublic)
async def me(user=Depends(get_current_user)):
    return UserPublic(**user)

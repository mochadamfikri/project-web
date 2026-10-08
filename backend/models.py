"""Pydantic schemas untuk request/response. Dokumen Mongo disimpan dengan field 'id' (uuid)."""
from datetime import datetime
from decimal import Decimal
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict

# ---------- USER ----------
class UserPublic(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: EmailStr
    nama: str
    role: str
    aktif: bool = True
    created_at: datetime


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ---------- INVENTORY (UNIT HP) ----------
JENIS_PERANGKAT = {"INTER", "RESMI"}
KONDISI = {"BARU", "BEKAS", "REFURBISHED"}
STATUS_STOK = {"TERSEDIA", "HOLD", "TERJUAL", "SERVIS", "DIARSIPKAN"}
STATUS_PUBLIKASI = {"DRAFT", "TAYANG", "DISEMBUNYIKAN", "DIARSIPKAN"}


class UnitHPCreate(BaseModel):
    merek: str
    model: str
    varian: Optional[str] = ""
    ram: Optional[str] = ""
    penyimpanan: Optional[str] = ""
    warna: Optional[str] = ""
    jenis_perangkat: str = "INTER"  # INTER / RESMI
    kondisi: str = "BARU"           # BARU / BEKAS / REFURBISHED
    grade_fisik: Optional[str] = ""
    kesehatan_baterai: Optional[int] = None  # persen 0-100
    imei_1: str
    imei_2: Optional[str] = ""
    serial_number: Optional[str] = ""
    kelengkapan: Optional[str] = ""
    catatan_pemeriksaan: Optional[str] = ""
    garansi: Optional[str] = ""
    supplier: Optional[str] = ""
    harga_beli: float = 0
    biaya_reparasi: float = 0
    biaya_tambahan: float = 0
    harga_jual: float = 0
    deskripsi: Optional[str] = ""
    foto_urls: List[str] = Field(default_factory=list)
    video_urls: List[str] = Field(default_factory=list)
    status_stok: str = "TERSEDIA"
    status_publikasi: str = "DRAFT"
    produk_unggulan: bool = False


class UnitHPUpdate(BaseModel):
    merek: Optional[str] = None
    model: Optional[str] = None
    varian: Optional[str] = None
    ram: Optional[str] = None
    penyimpanan: Optional[str] = None
    warna: Optional[str] = None
    jenis_perangkat: Optional[str] = None
    kondisi: Optional[str] = None
    grade_fisik: Optional[str] = None
    kesehatan_baterai: Optional[int] = None
    imei_1: Optional[str] = None
    imei_2: Optional[str] = None
    serial_number: Optional[str] = None
    kelengkapan: Optional[str] = None
    catatan_pemeriksaan: Optional[str] = None
    garansi: Optional[str] = None
    supplier: Optional[str] = None
    harga_beli: Optional[float] = None
    biaya_reparasi: Optional[float] = None
    biaya_tambahan: Optional[float] = None
    harga_jual: Optional[float] = None
    deskripsi: Optional[str] = None
    foto_urls: Optional[List[str]] = None
    video_urls: Optional[List[str]] = None
    status_stok: Optional[str] = None
    status_publikasi: Optional[str] = None
    produk_unggulan: Optional[bool] = None
    alasan_hold: Optional[str] = None


class UnitHPPublic(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    merek: str
    model: str
    varian: Optional[str] = ""
    ram: Optional[str] = ""
    penyimpanan: Optional[str] = ""
    warna: Optional[str] = ""
    jenis_perangkat: str
    kondisi: str
    grade_fisik: Optional[str] = ""
    kesehatan_baterai: Optional[int] = None
    imei_1: str
    imei_2: Optional[str] = ""
    serial_number: Optional[str] = ""
    kelengkapan: Optional[str] = ""
    catatan_pemeriksaan: Optional[str] = ""
    garansi: Optional[str] = ""
    supplier: Optional[str] = ""
    harga_beli: float = 0
    biaya_reparasi: float = 0
    biaya_tambahan: float = 0
    harga_jual: float = 0
    total_modal: float = 0
    estimasi_laba_kotor: float = 0
    deskripsi: Optional[str] = ""
    foto_urls: List[str] = Field(default_factory=list)
    video_urls: List[str] = Field(default_factory=list)
    status_stok: str
    status_publikasi: str
    produk_unggulan: bool = False
    tanggal_input: datetime
    tanggal_input_fmt: str = ""
    alasan_hold: Optional[str] = ""
    hold_oleh: Optional[str] = ""
    hold_batas: Optional[datetime] = None
    dibuat_oleh: Optional[str] = ""

import React, {useState, useEffect} from 'react'
import Layout from '../layouts/Layout'
import { BasicButton } from '../components/BaseButton'
import { GetSuratByType, CreateSuratByType, GetWarga, UpdateSuratByType, CreateSuratKetUsaha, GetSuratKetUsaha, UpdateSuratKetUsaha, CreateSuratKematian, getSuratKematian, UpdateSuratKematian } from '../api/suratApi'   //api
import { GetPegawai } from '../api/pegawaiApi'     // api
import { BaseModal, openModal, closeModal, ModalLoading } from '../components/BaseModal'
import { BaseInput, InputIcon, SelectInput } from '../components/BaseInput'
import { AlertError, AlertSuccess } from '../components/SweetAlert'
import { getId, formatDateMounth, printSurat, formatDateFromISO, formatToDot, formatedDayMounth } from '../function/baseFunction'
import { FooterTtd, BiodataWarga, HeadPegawai, KopSurat, BaseSurat, Paragraf, UsahaWarga, DomisiliUsaha, DataKematian } from '../components/SuratComponents'
import { TableHeader, TablePaginate } from '../components/BaseTable'

const Surat = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const monthRomawis = [ "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII" ];
  const monthRomawi = monthRomawis[month]

  const [suratKey, setSuratKey] = useState('')
  const [suratList, setSuratList] = useState([])
  const [pegawaiList, setPegawaiList] = useState([])
  const [wargaList, setWargaList] = useState([])

  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [jk, setJk] = useState('')
  const [tempatLahir, setTempatLahir] = useState('')
  const [tglLahir, setTglLahir] = useState('')
  const [pekerjaan, setPekerjaan] = useState('')
  const [negara, setNegara] = useState('indonesia')
  const [status, setStatus] = useState('')
  const [agama, setAgama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [rtrw, setRtrw] = useState('')
  
  const [idSurat, setIdSurat] = useState('')
  const [idPegawai, setIdPegawai] = useState('')
  const [noSurat, setNoSurat] = useState(`${suratKey}/...../BLR/${monthRomawi}/${year}`)
  const [noSuratNumber, setNoSuratNumber] = useState('')
  const [maksud, setMaksud] = useState('')
  const [suratName, setSuratName] = useState('')
  const [suratCreatedAt, setSuratCreatedAt] = useState('')
  const [noSuratPengantar, setNoSuratPengantar] = useState('')
  const [variabel, setVariabel] = useState('')

  const [namaPegawai, setNamaPegawai] = useState('')
  const [nipPegawai, setNipPegawai] = useState('')
  const [jabatanPegawai, setJabatanPegawai] = useState('')

  const [actText, setActText] = useState('')

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')

  // data usaha
  const [namaUsaha, setNamaUsaha] = useState('')
  const [jenisUsaha, setJenisUsaha] = useState('')
  const [npwp, setNpwp] = useState('')
  const [noIzinUsaha, setNoIzinUsaha] = useState('')
  const [noFiskal, setNoFiskal] = useState('')
  const [luasTempatUsaha, setLuasTempatUsaha] = useState('')
  const [alamatUsaha, setAlamatUsaha] = useState('')
  const [tahunBerdiri, setTahunBerdiri] = useState('')
  const [bertempat, setBertempat] = useState('')
  const [penghasilan, setPenghasilan] = useState('')
  const [desa, setDesa] = useState('')
  const [kecamatan, setKecamatan] = useState('')

  // data kematian
  const [sebabKematian, setSebabKematian] = useState('')
  const [tempatKematian, setTempatKematian] = useState('')
  const [hariTgl, setHariTgl] = useState('')
  const [hubungan, setHubungan] = useState('')
  const [namaP, setNamap] = useState('')
  const [nikP, setNikp] = useState('')
  const [alamatP, setAlamatP] = useState('')

  const getAllData = async (namaSurat = '', search = '') => {
    try {
      // const response = await GetAllSurat(page, limit, namaSurat)
      // name, id, id_warga, no_surat, id_pegawai, search
      const response = await GetSuratByType(namaSurat, '', '', '', '', search, page, limit)
      setSuratList(response.data)
      setTotalPage(response.total_page)
    } catch (error) {
      console.log(error, '<-- error get surat');
    }
  }

  const createNew = () => {
    getId('noSuratNumber').removeAttribute('disabled')
    const select = getId('selectOpt')
    select.click()
    setActText('create')
    resetData()
    openModal('createSuratName')
    getId('btnCreate').classList.remove('hidden')
    getId('btnUpdate').classList.add('hidden')
  }

  const nextCreateSurat = () => {
    if (suratName === '' || suratName === 'all') {
      AlertError('pilih nama surat terlebih dahulu')
    } else {
      closeModal('createSuratName')
      openModal('upsert')
    }

    setSuratKeyAndData(suratName)
  }

  const setSuratKeyAndData = (names) => {
    const removeAdd = (id, action) => getId(id).classList[action]('hidden')
    names === 'surat keterangan usaha' ? removeAdd('formDataUsaha', 'remove') : removeAdd('formDataUsaha', 'add')
    names === 'surat keterangan domisili usaha' ? removeAdd('formDataDomUsaha', 'remove') : removeAdd('formDataDomUsaha', 'add')
    names === 'surat keterangan penghasilan' ? removeAdd('formDataPenghasilan', 'remove') : removeAdd('formDataPenghasilan', 'add')
    names === 'surat keterangan kematian' ? removeAdd('formDataKematian', 'remove') : removeAdd('formDataKematian', 'add')

    names === 'surat keterangan berkelakuan baik' ? setSuratKey('301') : null
    names === 'surat keterangan belum memiliki rumah' ? setSuratKey('460') : null
    names === 'surat keterangan belum bekerja' || names === 'surat keterangan belum menikah' ? setSuratKey('474.5') : null
    names === 'surat keterangan usaha' || names === 'surat keterangan domisili usaha' ? setSuratKey('517') : null
    names === 'surat keterangan penghasilan' ? setSuratKey('010') : null
    names === 'surat keterangan kematian' ? setSuratKey('474.3') : null
  }

  const previousCreateSuratName = () => {
    closeModal('upsert')
    openModal('createSuratName')
  }

  // ============================================================

  const handleInput = (e) => {
    const { name, value } = e.target;
    const numberValue = value.replace(/[^0-9.]/g, '');
    const rtrwValue = value.replace(/[^0-9/]/g, '');

    setPage(1)
    switch (name) {
      case 'nama surat': setSuratName(value); break;
      case 'nama': setNama(value); break;
      case 'NIK': setNik(value); break;
      case 'jk': setJk(value); break;
      case 'tempat lahir': setTempatLahir(value); break;
      case 'tanggal lahir': setTglLahir(value); break;
      case 'pekerjaan': setPekerjaan(value); break;
      case 'kewarganegaraan': setNegara(value); break;
      case 'status': setStatus(value); break;
      case 'agama': setAgama(value); break;
      case 'alamat': setAlamat(value); break;
      case 'RT/RW': setRtrw(rtrwValue); break;
      case 'no surat number': setNoSuratNumber(numberValue); setNoSurat(`${suratKey}/${numberValue}/BLR/${monthRomawi}/${year}`); break;
      case 'no surat pengantar': setNoSuratPengantar(numberValue); break;
      case 'maksud': setMaksud(value); break;
      case 'pegawai': setIdPegawai(parseInt(value)); break;
      case 'nama usaha': setNamaUsaha(value); break;
      case 'jenis usaha': setJenisUsaha(value); break;
      case 'npwp': setNpwp(value); break;
      case 'no izin usaha': setNoIzinUsaha(value); break;
      case 'no fiskal': setNoFiskal(value); break;
      case 'luas tempat usaha': setLuasTempatUsaha(value); break;
      case 'alamat usaha': setAlamatUsaha(value); break;
      case 'tahun berdiri': setTahunBerdiri(value); break;
      case 'bertempat': setBertempat(value); break;
      case 'penghasilan': setPenghasilan(value); break;
      case 'desa': setDesa(value); break;
      case 'kecamatan': setKecamatan(value); break;
      case 'sebab kematian': setSebabKematian(value); break;
      case 'tempat kematian': setTempatKematian(value); break;
      case 'hari tanggal': setHariTgl(value); break;
      case 'hubungan': setHubungan(value); break;
      case 'nama pelapor': setNamap(value); break;
      case 'nik pelapor': setNikp(value); break;
      case 'alamat pelapor': setAlamatP(value); break;
      case 'search': setSearch(value); break;
      case 'limit': setLimit(value); break;
      default: break;
    }
  };

  const createSurat = async () => {
    try {
      if (
        suratName === '' || nama === '' || nik === '' || jk === '' || tempatLahir === '' || tglLahir === '' ||
        pekerjaan === '' || negara === '' || status === '' || agama === '' || alamat === '' || rtrw === '' ||
        noSuratNumber === '' || maksud === '' || idPegawai === ''
      ) {
        AlertError('input tidak boleh kosong')
      } else {
        closeModal('upsert')
        openModal('modal-loading')

        if (suratName === 'surat keterangan usaha' || suratName === 'surat keterangan domisili usaha' || suratName === 'surat keterangan penghasilan') {
          await CreateSuratKetUsaha({
            nama_surat: suratName, nama: nama, nik: nik, jenis_kelamin: jk, tempat_lahir: tempatLahir,
            tanggal_lahir: tglLahir, pekerjaan: pekerjaan, kewarganegaraan: negara,
            status: status, agama: agama, alamat: alamat, rt_rw: rtrw, no_surat: noSurat, variabel: `/BLR/${monthRomawi}/${year}`,
            no_surat_number: noSuratNumber, maksud: maksud, no_surat_pengantar: noSuratPengantar, id_pegawai: idPegawai,
            nama_usaha: namaUsaha, jenis_usaha: jenisUsaha, npwp: npwp, no_izin_usaha: noIzinUsaha,
            no_fiskal: noFiskal, luas_tempat_usaha: luasTempatUsaha, alamat_usaha: alamatUsaha,
            tahun_berdiri: tahunBerdiri, bertempat: bertempat, penghasilan: penghasilan, desa: desa, kecamatan: kecamatan
          })
        } else if (suratName === 'surat keterangan kematian') {
          await CreateSuratKematian({
            nama_surat: suratName, nama: nama, nik: nik, jenis_kelamin: jk, tempat_lahir: tempatLahir,
            tanggal_lahir: tglLahir, pekerjaan: pekerjaan, kewarganegaraan: negara,
            status: status, agama: agama, alamat: alamat, rt_rw: rtrw, no_surat: noSurat, variabel: `/BLR/${monthRomawi}/${year}`,
            no_surat_number: noSuratNumber, maksud: maksud, no_surat_pengantar: noSuratPengantar, id_pegawai: idPegawai,
            sebab_kematian: sebabKematian, tempat_kematian: sebabKematian, hari_tanggal: hariTgl, hubungan: hubungan,
            nama_p: namaP, nik_p: nikP, alamat_p: alamatP
          })
        } else {
          await CreateSuratByType({
            nama_surat: suratName, nama: nama, nik: nik, jenis_kelamin: jk, tempat_lahir: tempatLahir,
            tanggal_lahir: tglLahir, pekerjaan: pekerjaan, kewarganegaraan: negara,
            status: status, agama: agama, alamat: alamat, rt_rw: rtrw, no_surat: noSurat, variabel: `/BLR/${monthRomawi}/${year}`,
            no_surat_number: noSuratNumber, maksud: maksud, no_surat_pengantar: noSuratPengantar, id_pegawai: idPegawai
          })
        }
  
  
        closeModal('modal-loading')
        AlertSuccess('surat berhasil dibuat')
        getAllData()
      }
    } catch (error) {
      AlertError()
    }
  }

  const setDataSurat = (surat) => {
    const warga = surat.warga
    setNamaPegawai(surat.pegawai.nama)
    setJabatanPegawai(surat.pegawai.jabatan)
    setNipPegawai(surat.pegawai.nip)
    setNik(warga.nik)
    setNama(warga.nama)
    setTempatLahir(warga.tempat_lahir)
    setTglLahir(warga.tanggal_lahir)
    setJk(warga.jenis_kelamin)
    setPekerjaan(warga.pekerjaan)
    setNegara(warga.kewarganegaraan)
    setStatus(warga.status)
    setAgama(warga.agama)
    setAlamat(warga.alamat)
    setRtrw(warga.rt_rw)
    setSuratName(surat.nama_surat)
    setIdSurat(surat.id)
    setNoSuratNumber(surat.no_surat_number)
    setNoSurat(surat.no_surat)
    setVariabel(surat.variabel)
    setNoSuratPengantar(surat.no_surat_pengantar || '-')
    setMaksud(surat.maksud)
    setSuratCreatedAt(surat.createdAt)
    setIdPegawai(surat.pegawai.id_pegawai)
    if (surat.ket_usaha) {
      const usaha = surat.ket_usaha
      setNamaUsaha(usaha.nama_usaha)
      setJenisUsaha(usaha.jenis_usaha)
      setNpwp(usaha.npwp)
      setNoIzinUsaha(usaha.no_izin_usaha)
      setNoFiskal(usaha.no_fiskal)
      setLuasTempatUsaha(usaha.luas_tempat_usaha)
      setAlamatUsaha(usaha.alamat_usaha)
      setTahunBerdiri(usaha.tahun_berdiri)
      setPenghasilan(usaha.penghasilan)
      setDesa(usaha.desa)
      setKecamatan(usaha.kecamatan)
    }
    if (surat.ket_kematian) {
      const mati = surat.ket_kematian
      setSebabKematian(mati.sebab_kematian)
      setTempatKematian(mati.tempat_kematian)
      setHariTgl(mati.hari_tanggal)
      setNamap(mati.nama_pelapor)
      setNikp(mati.nik_pelapor)
      setAlamatP(mati.alamat_pelapor)
      setHubungan(mati.hubungan)
    }
    
  }

  const resetData = () => {
    setNama(''); setTempatLahir(''); setTglLahir(''); setJk(''); setPekerjaan('')
    setNegara('indonesia'); setStatus(''); setAgama(''); setAlamat(''); setRtrw(''); setNoSuratPengantar('')
    setNoSurat(''); setNoSuratNumber(''); setMaksud(''); setIdPegawai(''); setNik(''); setSuratName('')

    setNamaUsaha(''); setJenisUsaha(''); setNpwp(''); setNoIzinUsaha(''); setNoFiskal('')
    setLuasTempatUsaha(''); setAlamatUsaha(''); setTahunBerdiri(''); setBertempat(''); setDesa(''); setKecamatan('')

    setSebabKematian(''); setTempatKematian(''); setHariTgl(''); setHubungan(''); setNamap(''); setNikp(''); setAlamatP('')
  }

  const hideShowDesc = (id) => {
    getId('descSKBaik').classList.add('hidden')
    getId('descSKRumah').classList.add('hidden')
    getId('descSKKerja').classList.add('hidden')
    getId('descSKBNikah').classList.add('hidden')
    getId('dataUsahaWarga').classList.add('hidden')
    getId('dataDomisiliUsaha').classList.add('hidden')
    getId('descSKPenghasilan').classList.add('hidden')
    getId('dataKematian').classList.add('hidden')
    getId(id).classList.remove('hidden')
  }

  const printSuratBySelected = async (surat) => {
    const nameCek = surat.nama_surat
    getId('maksudWarga').classList.remove('hidden')
    if (nameCek === 'surat keterangan berkelakuan baik') {
      hideShowDesc('descSKBaik')
    } else if (nameCek === 'surat keterangan belum memiliki rumah') {
      hideShowDesc('descSKRumah')
    } else if (nameCek === 'surat keterangan belum bekerja') {
      hideShowDesc('descSKKerja')
    } else if (nameCek === 'surat keterangan belum menikah') {
      hideShowDesc('descSKBNikah')
    } else if (nameCek === 'surat keterangan usaha') {
      hideShowDesc('dataUsahaWarga')
      getId('maksudWarga').classList.add('hidden')
    } else if (nameCek === 'surat keterangan domisili usaha') {
      hideShowDesc('dataDomisiliUsaha')
    } else if (nameCek === 'surat keterangan penghasilan') {
      hideShowDesc('descSKPenghasilan')
    } else if (nameCek === 'surat keterangan kematian') {
      hideShowDesc('dataKematian')
    }

    if (surat.pegawai.jabatan === 'lurah balaroa') {
      getId('anLurah').classList.add('hidden')
      getId('ttdJabatan').classList.add('uppercase')
      getId('ttdJabatan').classList.remove('capitalize')
    } else {
      getId('anLurah').classList.remove('hidden')
      getId('ttdJabatan').classList.remove('uppercase')
      getId('ttdJabatan').classList.add('capitalize')
    }
    openModal('suratPreview')
    if (nameCek === 'surat keterangan usaha' || nameCek === 'surat keterangan domisili usaha' || nameCek === 'surat keterangan penghasilan') {
      const sUsaha = await GetSuratKetUsaha(nameCek, surat.id)
      setDataSurat(sUsaha.data[0])
    } else if (nameCek === 'surat keterangan kematian') {
      const sMati = await getSuratKematian(surat.id)
      setDataSurat(sMati.data[0])
    } else {
      setDataSurat(surat)
    }

    if (nameCek === 'surat keterangan domisili usaha') {
      getId('desaWarga').classList.remove('hidden')
      getId('kecamatanWarga').classList.remove('hidden')
    } else {
      getId('desaWarga').classList.add('hidden')
      getId('kecamatanWarga').classList.add('hidden')
    }
  }

  const editSurat = async (surat) => {
    const namecek = surat.nama_surat

    setSuratKeyAndData(namecek)
    // getId('noSuratNumber').setAttribute('disabled', 'on')
    setActText('update')
    getId('btnCreate').classList.add('hidden')
    getId('btnUpdate').classList.remove('hidden')
    openModal('upsert')
    if (namecek === 'surat keterangan usaha' || namecek === 'surat keterangan domisili usaha' || suratName === 'surat keterangan penghasilan') {
      const sUsaha = await GetSuratKetUsaha(surat.nama_surat, surat.id)
      setDataSurat(sUsaha.data[0])
    } else if (namecek === 'surat keterangan kematian') {
      const sMati = await getSuratKematian(surat.id)
      setDataSurat(sMati.data[0])
    } else {
      setDataSurat(surat)
    }
  }

  const updateSurat = async () => {
    try {
      closeModal('upsert')
      openModal('modal-loading')

      if (suratName === 'surat keterangan usaha' || suratName === 'surat keterangan domisili usaha' || suratName === 'surat keterangan penghasilan') {
        await UpdateSuratKetUsaha({
          id_surat: idSurat, nama: nama, nik: nik, jenis_kelamin: jk, tempat_lahir: tempatLahir,
          tanggal_lahir: tglLahir, pekerjaan: pekerjaan, kewarganegaraan: negara,
          status: status, agama: agama, alamat: alamat, rt_rw: rtrw, no_surat: noSurat, no_surat_pengantar: noSuratPengantar,
          no_surat_number: noSuratNumber, maksud: maksud, id_pegawai: idPegawai,
          nama_usaha: namaUsaha, jenis_usaha: jenisUsaha, npwp: npwp, no_izin_usaha: noIzinUsaha, no_fiskal: noFiskal,
          luas_tempat_usaha: luasTempatUsaha, alamat_usaha: alamatUsaha, tahun_berdiri: tahunBerdiri, penghasilan: penghasilan, desa: desa, kecamatan: kecamatan
        })
      } else if (suratName === 'surat keterangan kematian') {
        await UpdateSuratKematian({
          id_surat: idSurat, nama: nama, nik: nik, jenis_kelamin: jk, tempat_lahir: tempatLahir,
          tanggal_lahir: tglLahir, pekerjaan: pekerjaan, kewarganegaraan: negara,
          status: status, agama: agama, alamat: alamat, rt_rw: rtrw, no_surat: noSurat, no_surat_pengantar: noSuratPengantar,
          no_surat_number: noSuratNumber, maksud: maksud, id_pegawai: idPegawai,
          sebab_kematian: sebabKematian, tempat_kematian: tempatKematian, hari_tanggal: hariTgl, 
          nama_p: namaP, nik_p: nikP, alamat_p: alamatP, hubungan: hubungan
        })
      } else {
        await UpdateSuratByType({
          id: idSurat, nama: nama, nik: nik, jenis_kelamin: jk, tempat_lahir: tempatLahir,
          tanggal_lahir: tglLahir, pekerjaan: pekerjaan, kewarganegaraan: negara,
          status: status, agama: agama, alamat: alamat, rt_rw: rtrw, no_surat: noSurat, no_surat_pengantar: noSuratPengantar,
          no_surat_number: noSuratNumber, maksud: maksud, id_pegawai: idPegawai
        })
      }

      closeModal('modal-loading')
      AlertSuccess('surat berhasil diperbarui')
      getAllData()
    } catch (error) {
      AlertError()
    }
  }

  const checkNikWarga = async () => {
    try {
      getId('selectOpt').classList.remove('hidden')
      const response = await GetWarga(nik, '', '', '')
      response.total_data >= 1 ? getId('nikIcon').classList.remove('hidden') : getId('nikIcon').classList.add('hidden')
      setWargaList(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getAllPegawai = async () => {
    try {
      const response = await GetPegawai('', '', 'active')
      setPegawaiList(response.data)
    } catch (error) {
      AlertError()
    }
  }

  const getAllWarga = async () => {
    try {
      const response = await GetWarga(nik, '', '', '')
      setWargaList(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const inputSearchSize = () => {
    const inputNik = getId('nik').offsetWidth
    getId('selectOpt').style.width = inputNik+'px'
  }

  const getWargaByNik = async (nikWarga) => {
    try {
      getId('selectOpt').classList.add('hidden')
      const resWarga = await GetWarga('', '', '', nikWarga)
      const w = resWarga.data[0]    // <== data warga

      setNama(w.nama)
      setNik(w.nik)
      setTempatLahir(w.tempat_lahir)
      setTglLahir(w.tanggal_lahir)
      setJk(w.jenis_kelamin)
      setPekerjaan(w.pekerjaan)
      setNegara(w.kewarganegaraan)
      setStatus(w.status)
      setAgama(w.agama)
      setAlamat(w.alamat)
      setRtrw(w.rt_rw)

    } catch (error) {
      console.log(error);
    }
  }


  const activeBtn = 'button py-1 text-white bg-gray-500 border-gray-500 border-1 hover:bg-gray-600 flex items-center'
  const disableBtn = 'button py-1 text-white flex items-center border-0 bg-gray-400'
  const [prevClass, setPrevClass] = useState(activeBtn)
  const [nextClass, setNextClass] = useState(activeBtn)
  const [disabledPrev, setDisabledPrev] = useState(false)
  const [disabledNext, setDisabledNext] = useState(false)
  const [btnPaginateClass, setBtnPaginateClass] = useState('')

  const checkPaginateBtn = () => {
    page == 1 ? setPrevClass(disableBtn) : setPrevClass(activeBtn)
    page == 1 ? setDisabledPrev(true) : setDisabledPrev(false)
    totalPage == page ? setNextClass(disableBtn) : setNextClass(activeBtn)
    totalPage == page ? setDisabledNext(true) : setDisabledNext(false)
    totalPage == 1 ? setBtnPaginateClass('hidden') : setBtnPaginateClass('')
  }

  const descOpt = 'Demikian Keterangan ini dibuat dan berlaku selama 1 (Satu) bulan sejak dikeluarkan, apabila dikemudian hari terdapat kesalahan data, maka akan diadakan perbaikan sebagaimana mestinya.'

  const closeThisModal = (idModal) => {
    closeModal(idModal)
    setSuratName('')
  }

  useEffect(() => {
    getAllData(suratName, search)
    getAllPegawai()
    inputSearchSize()
    getAllWarga()
    checkPaginateBtn()
  }, [page, totalPage, limit])

  return (
    <>
      <Layout
        title='semua surat'
        button={<BasicButton onClick={createNew} iconShow='block' title='Create New'/>}
      >
        

        <div className="card has-table">
          <div className="card-content text-black">
            <TableHeader title='daftar surat'>
              <SelectInput className='mr-4' name='limit' label=' ' onChange={handleInput}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </SelectInput>
              <InputIcon value={search} onChange={handleInput} name='search' onKeyUp={() => getAllData('', search)} className='mr-4'
                icon={<i className="fa-solid fa-magnifying-glass"></i>} type='search' classLabel='hidden' placeholder='cari surat'
              />

              <div className='flex items-center mr-2'>Filter Nama Surat:</div>
              <SelectInput value={suratName} name='nama surat' label=' ' onChange={handleInput}
                onClick={() => suratName === '' ? getAllData() : getAllData(suratName) }
              >
                <option value="">select All</option>
                <option value="surat keterangan berkelakuan baik">surat keterangan berkelakuan baik</option>
                <option value="surat keterangan belum memiliki rumah">surat keterangan belum memiliki rumah</option>
                <option value="surat keterangan belum bekerja">surat keterangan belum bekerja</option>
                <option value="surat keterangan belum menikah">surat keterangan belum menikah</option>
                <option value="surat keterangan usaha">surat keterangan usaha</option>
                <option value="surat keterangan domisili usaha">surat keterangan domisili usaha</option>
                <option value="surat keterangan penghasilan">surat keterangan penghasilan</option>
                <option value="surat keterangan kematian">surat keterangan kematian</option>
              </SelectInput>
            </TableHeader>
            <table className='text-slate-800'>
              <thead>
                <tr>
                  <th></th>
                  <th>Nama Surat</th>
                  <th>No Surat</th>
                  <th>Nama Warga</th>
                  <th>NIK Warga</th>
                  <th>Nama Pegawai</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {suratList.map((surat, index) => (
                  <tr key={surat.id}>
                   <td className="image-cell">{index+1}</td>
                    <td data-label="Nama Surat"><small>{surat.nama_surat}</small></td>
                    <td data-label="No Surat"><small>{surat.no_surat}</small></td>
                    <td data-label="Nama Warga">{surat.warga.nama}</td>
                    <td data-label="NIK Warga">{surat.warga.nik}</td>
                    <td data-label="Nama Pegawai">{surat.pegawai.nama}</td>
                    <td data-label="Created"><small>{formatDateFromISO(surat.createdAt)}</small></td>
                    <td className="actions-cell">
                      <div className="buttons right nowrap">
                        <button onClick={() => printSuratBySelected(surat)} className="button small text-white bg-yellow-500 border-1 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600">
                          <span className="icon"><i className="fa-solid fa-eye"></i></span>
                        </button>
                        <button onClick={() => editSurat(surat)} id="editButton" className="button small blue">
                          <span className="icon"><i className="fa-solid fa-pen-to-square"></i></span>
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePaginate>
              <small>Page {page} of {totalPage}</small>
              <div className={`buttons ${btnPaginateClass}`}>
                <button type="button" onClick={() => setPage(page - 1)} className={prevClass} disabled={disabledPrev}>
                  <i className="fa-solid fa-angle-left pr-1"></i>
                  <span className='pb-1'>previous</span>
                </button>
                <button type="button" onClick={() => setPage(page + 1)} className={nextClass} disabled={disabledNext}>
                  <span className='pb-1'>next</span>
                  <i className="fa-solid fa-angle-right pl-1"></i>
                </button>
              </div>
            </TablePaginate>
          </div>
        </div>
      </Layout>

      {/* ===== select surat name before create ===== */}
      <BaseModal id='createSuratName' title='create surat'>
        <SelectInput value={suratName} name='nama surat' onChange={handleInput} >
          <option value="surat keterangan berkelakuan baik">surat keterangan berkelakuan baik</option>
          <option value="surat keterangan belum memiliki rumah">surat keterangan belum memiliki rumah</option>
          <option value="surat keterangan belum bekerja">surat keterangan belum bekerja</option>
          <option value="surat keterangan belum menikah">surat keterangan belum menikah</option>
          <option value="surat keterangan usaha">surat keterangan usaha</option>
          <option value="surat keterangan domisili usaha">surat keterangan domisili usaha</option>
          <option value="surat keterangan penghasilan">surat keterangan penghasilan</option>
          <option value="surat keterangan kematian">surat keterangan kematian</option>
        </SelectInput>
        <div className="modal-action pt-4">
          <BasicButton onClick={() => closeThisModal('createSuratName')} title='Close' className='bg-gray-500 text-white' />
          <BasicButton onClick={nextCreateSurat} title='Next'/>
        </div>
      </BaseModal>

      {/* ===== upsert modal ===== */}
      <BaseModal onClick={() => getId('selectOpt').classList.add('hidden')} id='upsert' title={`${actText} ${suratName}`} classSize='w-screen'>
        <div className='grid grid-cols-4 gap-4'>
          <BaseInput autoComplete='off' id='nik' value={nik} onChange={handleInput} onKeyUp={checkNikWarga} name='NIK' label={<>NIK <span className="mdi mdi-circle text-red-500 hidden" id='nikIcon'></span></>} />
          <div className='mt-16 border border-gray-800' style={{ position: 'absolute' }}>
            <select id="selectOpt" className='bg-white overflow-hidden hidden overflow-x-auto cursor-pointer' size={'5'}>
              {wargaList.map((warga) => (
                <option key={warga.id} value={warga.nik} onClick={() => getWargaByNik(warga.nik)}>{warga.nama} - {warga.nik}</option>
              ))}
            </select>
          </div>
          <BaseInput value={nama} onChange={handleInput} name='nama' />
          <BaseInput value={tempatLahir} onChange={handleInput} name='tempat lahir' />
          <BaseInput value={tglLahir} onChange={handleInput} name='tanggal lahir' type='date' />
          <SelectInput value={jk} name='jk' label='jenis kelamin' onChange={handleInput} >
            <option value='l'>laki-laki</option>
            <option value="p">perempuan</option>
          </SelectInput>
          <BaseInput value={pekerjaan} onChange={handleInput} name='pekerjaan' />
          <BaseInput value={negara} onChange={handleInput} name='kewarganegaraan' />
          <BaseInput value={status} onChange={handleInput} name='status' />
          <SelectInput value={agama} onChange={handleInput} name='agama'>
            <option value="islam">Islam</option>
            <option value="kristen">Kristen</option>
            <option value="katolik">Katolik</option>
            <option value="hindu">Hindu</option>
            <option value="buddha">Buddha</option>
            <option value="konghucu">Konghucu</option>
          </SelectInput>
          <BaseInput value={alamat} onChange={handleInput} name='alamat' />
          <BaseInput value={rtrw} onChange={handleInput} name='RT/RW' maxLength='7' smallText='format: 001/001' />
          <BaseInput value={maksud} onChange={handleInput} name='maksud' />
          <BaseInput value={noSuratNumber} onChange={handleInput} name='no surat number' idInput='noSuratNumber' />
          <BaseInput value={noSurat} onChange={handleInput} name='no surat' disabled='on' />
          <BaseInput value={noSuratPengantar} onChange={handleInput} name='no surat pengantar' />
          <SelectInput value={idPegawai} name='pegawai' onChange={handleInput}>
            {pegawaiList.map((pegawai) => (
              <option key={pegawai.id} value={pegawai.id}>{pegawai.nama}</option>
            ))}
          </SelectInput>
        </div>
        <div className='mt-8 hidden' id='formDataUsaha'>
          <div className='text-xl mb-2 font-bold'>Data Usaha</div>
          <div className='grid grid-cols-4 gap-4'>
            <BaseInput value={namaUsaha} onChange={handleInput} name='nama usaha' />
            <BaseInput value={jenisUsaha} onChange={handleInput} name='jenis usaha' />
            <BaseInput value={npwp} onChange={handleInput} name='npwp' />
            <BaseInput value={noIzinUsaha} onChange={handleInput} name='no izin usaha' />
            <BaseInput value={noFiskal} onChange={handleInput} name='no fiskal' />
            <BaseInput value={luasTempatUsaha} onChange={handleInput} name='luas tempat usaha' />
            <BaseInput value={alamatUsaha} onChange={handleInput} name='alamat usaha' />
            <BaseInput value={tahunBerdiri} onChange={handleInput} name='tahun berdiri' />
          </div>
        </div>
        <div className='mt-8 hidden' id='formDataDomUsaha'>
          <div className='text-xl mb-2 font-bold'>Data Domisili Usaha</div>
          <div className='grid grid-cols-4 gap-4'>
            <BaseInput value={desa} onChange={handleInput} name='desa' label='kelurahan/desa' />
            <BaseInput value={kecamatan} onChange={handleInput} name='kecamatan' />
            <BaseInput value={namaUsaha} onChange={handleInput} name='nama usaha' />
            <BaseInput value={jenisUsaha} onChange={handleInput} name='jenis usaha' />
            <BaseInput value={alamatUsaha} onChange={handleInput} name='alamat usaha' />
            <BaseInput value={tahunBerdiri} onChange={handleInput} name='tahun berdiri' />
          </div>
        </div>
        <div className='mt-8 hidden' id='formDataPenghasilan'>
          <div className='text-xl mb-2 font-bold'>Data Penghasilan</div>
          <div className='grid grid-cols-4 gap-4'>
            <BaseInput value={jenisUsaha} onChange={handleInput} name='jenis usaha' />
            <BaseInput value={alamatUsaha} onChange={handleInput} name='alamat usaha' />
            <BaseInput value={penghasilan} onChange={handleInput} name='penghasilan' />
          </div>
        </div>
        <div className='mt-8 hidden' id='formDataKematian'>
          <div className='text-xl mb-2 font-bold'>Data Kematian</div>
          <div className='grid grid-cols-4 gap-4'>
            <BaseInput value={sebabKematian} onChange={handleInput} name='sebab kematian' />
            <BaseInput value={tempatKematian} onChange={handleInput} name='tempat kematian' />
            <BaseInput value={hariTgl} onChange={handleInput} name='hari tanggal' type='date' />
            <BaseInput value={namaP} onChange={handleInput} name='nama pelapor' />
            <BaseInput value={nikP} onChange={handleInput} name='nik pelapor' />
            <BaseInput value={alamatP} onChange={handleInput} name='alamat pelapor' />
            <BaseInput value={hubungan} onChange={handleInput} name='hubungan' />
          </div>
        </div>
        <div className="modal-action pt-4">
          <div id='btnCreate'>
            <BasicButton onClick={previousCreateSuratName} title='Previous' className='bg-gray-500 text-white mr-2' />
            <BasicButton onClick={createSurat} title='Create'/>
          </div>
          <div id='btnUpdate'>
            <BasicButton onClick={() => closeModal('upsert')} title='Close' className='bg-gray-500 text-white mr-2' />
            <BasicButton onClick={updateSurat} title='Update'/>
          </div>
        </div>
      </BaseModal>

      {/* ===== preview and print surat modal ===== */}
      <BaseModal id='suratPreview' classSize='w-screen min-h-screen'>
        <BaseSurat>
          <KopSurat surat={suratName} no={noSurat} />
          <HeadPegawai nama={namaPegawai} jabatan={jabatanPegawai} />

          <BiodataWarga
            nama={nama} nik={nik} jk={jk} ttl={tempatLahir + ', ' + formatDateMounth(tglLahir)} kerja={pekerjaan}
            negara={negara} status={status} agama={agama} alamat={alamat} rtrw={rtrw} maksud={maksud} desa={desa} kecamatan={kecamatan}
          />

          <UsahaWarga id='dataUsahaWarga'
            nama={namaUsaha} jenis={jenisUsaha} npwp={npwp} noIzinUsaha={noIzinUsaha} noFiskal={noFiskal} 
            luas={luasTempatUsaha} alamat={alamatUsaha} tahun={tahunBerdiri} maksud={maksud}
          />

          <DomisiliUsaha id='dataDomisiliUsaha'
            nama={namaUsaha} jenis={jenisUsaha} alamat={alamatUsaha} tahun={tahunBerdiri}
          />

          <DataKematian id='dataKematian'
            hari={formatedDayMounth(hariTgl)} tempat={tempatKematian} sebab={sebabKematian} nama={namaP} nik={nikP} alamat={alamatP} hubungan={hubungan}
          />

          <Paragraf id='descSKBaik'>
            Sepanjang pengamatan kami serta pengetahuan kami, hingga saat ini dikeluarkan surat 
            keterangan ini, Oknum tersebut belum pernah tersangkut dalam perkara pidana kriminal, 
            serta berkelakuan baik terhadap masyarakat sesuai dengan Surat Pengantar RT/RW 
            Nomor: {noSuratPengantar}/{formatToDot(rtrw)}{variabel}, tanggal {formatDateFromISO(suratCreatedAt)}.
          </Paragraf>

          <Paragraf id='descSKRumah'>
            Bahwa nama tersebut di atas adalah Warga/Penduduk Kelurahan Balaroa Kecamatan Palu Barat 
            dan benar yang bersangkutan belum memiliki rumah, sesuai dengan Surat Pengantar 
            Nomor: {noSuratPengantar}/{formatToDot(rtrw)}{variabel}, tanggal {formatDateFromISO(suratCreatedAt)}.
          </Paragraf>

          <div id='descSKKerja'>
            <Paragraf>
              Bahwa benar nama tersebut di atas adalah Warga/Penduduk Kelurahan Balaroa Kecamatan 
              Palu Barat dan sepanjang pengetahuan kami belum bekerja, sesuai dengan Surat Pengantar 
              Nomor: {noSuratPengantar}/{formatToDot(rtrw)}{variabel}, tanggal {formatDateFromISO(suratCreatedAt)}.
            </Paragraf>
            <Paragraf>{descOpt}</Paragraf>
          </div>

          <div id='descSKBNikah'>
            <Paragraf>
              Bahwa benar nama tersebut di atas adalah Warga/Penduduk Kelurahan Balaroa Kecamatan 
              Palu Barat dan sepanjang pengetahuan kami belum pernah menikah, sesuai dengan Surat 
              Nomor: {noSuratPengantar}/{formatToDot(rtrw)}{variabel}, tanggal {formatDateFromISO(suratCreatedAt)}.
            </Paragraf>

            <Paragraf>{descOpt}</Paragraf>
          </div>

          <Paragraf id='descSKPenghasilan'>
            Bahwa benar yang namaya tersebut di atas adalah Warga/Penduduk Kelurahan Balaroa Kecamatan 
            Palu Barat Kota Palu, RT. {rtrw}, memiliki Usaha <span className='capitalize'>{jenisUsaha}</span> di {alamatUsaha} dan memiliki 
            berpenghasilan Rp. ±{penghasilan},-/Bulan, sesuai dengan Surat Pengantar RT 
            No: {noSuratPengantar}/{formatToDot(rtrw)}{variabel}, Tanggal {formatDateFromISO(suratCreatedAt)}.
          </Paragraf>

          <Paragraf>Demikian Surat Keterangan ini dibuat untuk dipergunakan seperlunya.</Paragraf>
          <FooterTtd date={formatDateFromISO(suratCreatedAt)} nama={namaPegawai} jabatan={jabatanPegawai} nip={nipPegawai} />
        </BaseSurat>

        <div className="modal-action pt-4">
          <BasicButton onClick={() => closeModal('suratPreview')} title='Close' className='bg-gray-500 text-white' />
          <BasicButton onClick={() => printSurat('printArea')} title='Print' />
        </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />
    </>
  )
}

export default Surat
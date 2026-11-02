import { Users, Database, Clock } from 'lucide-react';

export const getArticleData = (articleId: string) => {
  const articleMap: { [key: string]: any } = {
    'cuti-1': {
      title: 'Cara Mengajukan Cuti Tahunan',
      updateDate: 'Diperbarui 15 Januari 2025',
      content: {
        sections: [
          {
            subtitle: 'Pendahuluan',
            paragraphs: [
              'Cuti tahunan merupakan hak setiap pegawai negeri sipil untuk mendapatkan waktu istirahat dari tugas dan kewajiban sehari-hari. Setiap pegawai berhak mendapatkan cuti tahunan selama 12 hari kerja dalam setahun setelah yang bersangkutan bekerja sekurang-kurangnya 1 tahun secara terus menerus.',
              'Panduan ini akan membantu Anda memahami proses pengajuan cuti tahunan melalui sistem SIMPEG (Sistem Informasi Manajemen Pegawai) secara lengkap dan mudah dipahami.'
            ]
          },
          {
            subtitle: 'Syarat Pengajuan Cuti Tahunan',
            paragraphs: [
              'Sebelum mengajukan cuti tahunan, pastikan Anda memenuhi persyaratan berikut:',
              '1. Telah bekerja minimal 1 tahun secara terus menerus\n2. Memiliki sisa kuota cuti tahunan yang mencukupi\n3. Mendapat persetujuan dari atasan langsung\n4. Tidak sedang dalam masa percobaan atau proses administrasi kepegawaian penting',
              'Pastikan juga untuk memeriksa saldo cuti tahunan Anda melalui dashboard Portal Sivitas sebelum mengajukan permohonan.'
            ]
          },
          {
            subtitle: 'Langkah-Langkah Pengajuan',
            paragraphs: [
              'Berikut adalah langkah-langkah untuk mengajukan cuti tahunan melalui sistem SIMPEG:',
              '1. Login ke Portal Sivitas Kemendikdasmen menggunakan akun resmi Anda\n2. Pilih menu "Kepegawaian" dari dashboard utama\n3. Klik submenu "Pengajuan Cuti"\n4. Pilih jenis cuti "Cuti Tahunan"\n5. Isi formulir pengajuan dengan lengkap, termasuk tanggal mulai dan selesai cuti\n6. Sertakan keterangan atau alasan pengajuan cuti (opsional)\n7. Upload dokumen pendukung jika diperlukan\n8. Review kembali data yang telah diisi\n9. Klik tombol "Ajukan" untuk mengirimkan permohonan',
              'Setelah pengajuan dikirim, Anda akan menerima notifikasi konfirmasi melalui email dan sistem.'
            ]
          },
          {
            subtitle: 'Proses Persetujuan',
            paragraphs: [
              'Setelah Anda mengajukan permohonan cuti, proses persetujuan akan melalui beberapa tahap:',
              '1. Atasan langsung akan menerima notifikasi untuk menyetujui atau menolak permohonan\n2. Jika disetujui atasan langsung, permohonan akan diteruskan ke bagian kepegawaian\n3. Bagian kepegawaian akan melakukan verifikasi kelengkapan data dan saldo cuti\n4. Persetujuan final akan diberikan oleh pejabat berwenang',
              'Proses persetujuan umumnya memakan waktu 3-5 hari kerja. Anda dapat memantau status pengajuan melalui menu "Riwayat Pengajuan Cuti" di portal.'
            ]
          },
          {
            subtitle: 'Hal-Hal yang Perlu Diperhatikan',
            paragraphs: [
              'Beberapa hal penting yang perlu Anda perhatikan saat mengajukan cuti tahunan:',
              '• Ajukan permohonan cuti minimal 7 hari sebelum tanggal pelaksanaan cuti\n• Pastikan tidak ada agenda penting atau deadline pekerjaan selama masa cuti\n• Koordinasikan dengan rekan kerja terkait pengalihan tugas selama Anda cuti\n• Cuti tahunan yang tidak diambil pada tahun berjalan akan hangus dan tidak dapat diakumulasikan ke tahun berikutnya\n• Dalam kondisi mendesak, Anda dapat mengajukan cuti mendadak dengan melampirkan surat keterangan yang sah',
              'Jika permohonan cuti ditolak, Anda akan menerima notifikasi beserta alasan penolakan. Anda dapat mengajukan kembali dengan memperbaiki hal-hal yang menjadi alasan penolakan.'
            ]
          }
        ]
      },
      relatedArticles: [
        { id: 'cuti-2', title: 'Prosedur Cuti Sakit' },
        { id: 'cuti-3', title: 'Cuti Melahirkan dan Hak-Haknya' },
        { id: 'cuti-4', title: 'Cuti Besar dan Ketentuan Pengajuan' },
        { id: 'cuti-5', title: 'Cara Membatalkan Pengajuan Cuti' },
        { id: 'cuti-6', title: 'Cuti di Luar Tanggungan Negara' }
      ],
      featuredArticles: [
        { id: 'gaji-1', title: 'Komponen Gaji Pegawai' },
        { id: 'gaji-2', title: 'Tunjangan Kinerja (Tukin)' },
        { id: 'kehadiran-1', title: 'Cara Melakukan Presensi' },
        { id: 'promosi-1', title: 'Syarat Kenaikan Pangkat' },
        { id: 'pengembangan-1', title: 'Program Diklat Struktural' }
      ],
      faqs: [
        {
          question: 'Berapa lama waktu yang dibutuhkan untuk persetujuan cuti?',
          answer: 'Proses persetujuan cuti tahunan umumnya memakan waktu 3-5 hari kerja. Namun, dalam kondisi tertentu, proses ini bisa lebih cepat atau lebih lama tergantung pada ketersediaan atasan dan kompleksitas verifikasi.'
        },
        {
          question: 'Apakah saya bisa mengajukan cuti untuk hari ini atau besok?',
          answer: 'Untuk cuti tahunan, sebaiknya diajukan minimal 7 hari sebelum tanggal pelaksanaan. Namun, untuk kondisi mendesak, Anda dapat mengajukan cuti mendadak dengan melampirkan surat keterangan yang sah dan persetujuan khusus dari atasan.'
        },
        {
          question: 'Apa yang terjadi jika sisa cuti tahunan saya tidak terpakai?',
          answer: 'Sisa cuti tahunan yang tidak diambil pada tahun berjalan akan hangus dan tidak dapat diakumulasikan ke tahun berikutnya. Oleh karena itu, disarankan untuk merencanakan penggunaan cuti tahunan Anda dengan baik.'
        },
        {
          question: 'Bagaimana jika pengajuan cuti saya ditolak?',
          answer: 'Jika permohonan cuti ditolak, Anda akan menerima notifikasi melalui sistem dan email beserta alasan penolakan. Anda dapat berdiskusi dengan atasan untuk mencari solusi atau mengajukan kembali di waktu yang lebih sesuai.'
        },
        {
          question: 'Apakah saya bisa membatalkan cuti yang sudah disetujui?',
          answer: 'Ya, Anda dapat membatalkan cuti yang sudah disetujui dengan mengajukan permohonan pembatalan melalui sistem. Pembatalan harus dilakukan minimal 3 hari sebelum tanggal pelaksanaan cuti kecuali ada kondisi darurat.'
        }
      ]
    }
  };

  return articleMap[articleId] || null;
};

export const getCategoryData = (categoryTitle: string) => {
  const categoryMap: { [key: string]: any } = {
    'Kepegawaian': {
      title: 'Kepegawaian',
      icon: Users,
      color: '#0B5FEF',
      subcategories: [
        {
          id: 'cuti',
          name: 'Cuti dan Izin',
          description: 'Panduan pengajuan cuti tahunan, cuti sakit, dan izin lainnya',
          articles: [
            {
              id: 'cuti-1',
              title: 'Cara Mengajukan Cuti Tahunan',
              excerpt: 'Panduan lengkap untuk mengajukan cuti tahunan melalui sistem SIMPEG, termasuk syarat dan ketentuan yang berlaku.',
              date: 'Diperbarui 15 Jan 2025',
              readTime: '5 menit',
              views: 1234
            },
            {
              id: 'cuti-2',
              title: 'Prosedur Cuti Sakit',
              excerpt: 'Ketahui langkah-langkah pengajuan cuti sakit dan dokumen yang diperlukan untuk klaim.',
              date: 'Diperbarui 12 Jan 2025',
              readTime: '4 menit',
              views: 892
            },
            {
              id: 'cuti-3',
              title: 'Cuti Melahirkan dan Hak-Haknya',
              excerpt: 'Informasi lengkap mengenai hak cuti melahirkan bagi pegawai perempuan sesuai regulasi yang berlaku.',
              date: 'Diperbarui 10 Jan 2025',
              readTime: '6 menit',
              views: 756
            }
          ]
        },
        {
          id: 'gaji',
          name: 'Gaji dan Tunjangan',
          description: 'Informasi tentang sistem penggajian, tunjangan, dan benefit',
          articles: [
            {
              id: 'gaji-1',
              title: 'Komponen Gaji Pegawai',
              excerpt: 'Penjelasan detail mengenai komponen-komponen yang ada dalam slip gaji pegawai negeri sipil.',
              date: 'Diperbarui 14 Jan 2025',
              readTime: '7 menit',
              views: 2103
            },
            {
              id: 'gaji-2',
              title: 'Tunjangan Kinerja (Tukin)',
              excerpt: 'Ketentuan pemberian tunjangan kinerja berdasarkan capaian kerja dan kehadiran.',
              date: 'Diperbarui 13 Jan 2025',
              readTime: '5 menit',
              views: 1567
            },
            {
              id: 'gaji-3',
              title: 'Cara Akses Slip Gaji Digital',
              excerpt: 'Panduan mengakses dan mengunduh slip gaji dalam format digital melalui portal kepegawaian.',
              date: 'Diperbarui 11 Jan 2025',
              readTime: '3 menit',
              views: 987
            }
          ]
        },
        {
          id: 'promosi',
          name: 'Promosi dan Mutasi',
          description: 'Panduan terkait kenaikan pangkat, promosi jabatan, dan mutasi',
          articles: [
            {
              id: 'promosi-1',
              title: 'Syarat Kenaikan Pangkat',
              excerpt: 'Persyaratan administratif dan teknis untuk pengajuan kenaikan pangkat pegawai.',
              date: 'Diperbarui 9 Jan 2025',
              readTime: '8 menit',
              views: 1876
            },
            {
              id: 'promosi-2',
              title: 'Proses Seleksi Promosi Jabatan',
              excerpt: 'Tahapan dan mekanisme seleksi untuk promosi ke jabatan yang lebih tinggi.',
              date: 'Diperbarui 8 Jan 2025',
              readTime: '6 menit',
              views: 1432
            },
            {
              id: 'promosi-3',
              title: 'Pengajuan Mutasi Internal',
              excerpt: 'Prosedur pengajuan mutasi antar unit kerja dalam satu instansi.',
              date: 'Diperbarui 7 Jan 2025',
              readTime: '5 menit',
              views: 654
            }
          ]
        },
        {
          id: 'pensiun',
          name: 'Pensiun dan Pemberhentian',
          description: 'Informasi seputar persiapan pensiun dan hak-hak pegawai',
          articles: [
            {
              id: 'pensiun-1',
              title: 'Persiapan Memasuki Masa Pensiun',
              excerpt: 'Checklist dan persiapan yang perlu dilakukan menjelang masa pensiun tiba.',
              date: 'Diperbarui 6 Jan 2025',
              readTime: '9 menit',
              views: 543
            },
            {
              id: 'pensiun-2',
              title: 'Hak-Hak Pegawai Pensiun',
              excerpt: 'Rincian hak dan benefit yang tetap diterima setelah memasuki masa pensiun.',
              date: 'Diperbarui 5 Jan 2025',
              readTime: '7 menit',
              views: 432
            }
          ]
        },
        {
          id: 'pengembangan',
          name: 'Pengembangan Karir',
          description: 'Program pelatihan dan pengembangan kompetensi pegawai',
          articles: [
            {
              id: 'pengembangan-1',
              title: 'Program Diklat Struktural',
              excerpt: 'Informasi mengenai program pendidikan dan pelatihan untuk jabatan struktural.',
              date: 'Diperbarui 4 Jan 2025',
              readTime: '6 menit',
              views: 1098
            },
            {
              id: 'pengembangan-2',
              title: 'Beasiswa Pendidikan Lanjutan',
              excerpt: 'Panduan pengajuan beasiswa untuk melanjutkan pendidikan ke jenjang yang lebih tinggi.',
              date: 'Diperbarui 3 Jan 2025',
              readTime: '8 menit',
              views: 876
            },
            {
              id: 'pengembangan-3',
              title: 'Pelatihan Kompetensi Teknis',
              excerpt: 'Daftar pelatihan kompetensi teknis yang tersedia dan cara mendaftar.',
              date: 'Diperbarui 2 Jan 2025',
              readTime: '5 menit',
              views: 765
            }
          ]
        }
      ]
    },
    'SINDE': {
      title: 'SINDE',
      icon: Database,
      color: '#4CA375',
      subcategories: [
        {
          id: 'sinde-akses',
          name: 'Akses dan Login',
          description: 'Panduan akses sistem SINDE',
          articles: [
            {
              id: 'sinde-1',
              title: 'Cara Login ke Sistem SINDE',
              excerpt: 'Panduan langkah demi langkah untuk mengakses Sistem Informasi Data Pendidikan.',
              date: 'Diperbarui 15 Jan 2025',
              readTime: '4 menit',
              views: 2456
            }
          ]
        }
      ]
    },
    'Kehadiran': {
      title: 'Kehadiran',
      icon: Clock,
      color: '#906CEF',
      subcategories: [
        {
          id: 'kehadiran-presensi',
          name: 'Presensi Harian',
          description: 'Panduan presensi dan absensi',
          articles: [
            {
              id: 'kehadiran-1',
              title: 'Cara Melakukan Presensi',
              excerpt: 'Panduan melakukan presensi harian melalui aplikasi mobile dan desktop.',
              date: 'Diperbarui 15 Jan 2025',
              readTime: '3 menit',
              views: 3421
            }
          ]
        }
      ]
    }
  };

  return categoryMap[categoryTitle] || null;
};

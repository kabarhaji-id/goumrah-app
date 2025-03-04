import {LandingContent} from "@/modules/landing/domain/landingModel";

export const dummyLandingData: LandingContent = {
    heroContent: {
        title: "Rumah ke Makkah, Hanya Satu Langkah",
        description: "Wujudkan perjalanan Umrah impian anda dengan mudah dan terpercaya, dari mana saja, kapan saja.",
        tagsLine: "#bikinTenang",
        buttonLabel: "Cek Izin Umroh Kami Disini",
        buttonUrl : "https://simpu.kemenag.go.id/home/detail/3039",
        imageUrl: "/assets/image/hero_landing.png",
        altText: "image hero"
    },

    singlePackage: {
        header : {
            title: "Umrah Ideal dengan Momen Tak Terlupakan mulai dari 22 jt",
            subtitle: "Sambut Panggilan-Nya"
        },
        silver: {
            id: "silver",
            image: "/assets/image/packages-umrah/silver/cover-umrah-hemat-ibadah-fokus.jpg",
            tags: [
                { icon: "clock", label: "9 Hari" },
                { icon: "la-kaaba", label: "Reguler" },
                { icon: "plane", label: "Transit" }
            ],
            title: "Umroh Hemat - Fokus Ibadah",
            departureDate: [
                {
                    date: "2025-03-03T10:00:00+07:00",
                    status: "expired"
                },
                {
                    date: "2025-03-17T10:00:00+07:00",
                    status: "expired"
                },
                {
                    date: "2025-04-15T10:00:00+07:00",
                    status: "closing-umrah"
                },
                {
                    date: "2025-05-01T10:00:00+07:00",
                    status: "musim-haji"
                },
                {
                    date: "2025-06-01T10:00:00+07:00",
                    status: "musim-haji"
                },
                {
                    date: "2025-07-07T10:00:00+07:00",
                    status: "active"
                },
                {
                    date: "2025-07-21T10:00:00+07:00",
                    status: "active"
                },
                {
                    date: "2025-08-04T10:00:00+07:00",
                    status: "active"
                },
                {
                    date: "2025-08-18T10:00:00+07:00",
                    status: "active"
                },
                {
                    date: "2025-09-01T10:00:00+07:00",
                    status: "active"
                },
                {
                    date: "2025-09-15T10:00:00+07:00",
                    status: "active"
                },
                {
                    date: "2025-10-06T10:00:00+07:00",
                    status: "coming-soon"
                },
                {
                    date: "2025-10-20T10:00:00+07:00",
                    status: "coming-soon"
                },
                {
                    date: "2025-11-03T10:00:00+07:00",
                    status: "coming-soon"
                },
                {
                    date: "2025-11-17T10:00:00+07:00",
                    status: "coming-soon"
                },
                {
                    date: "2025-12-01T10:00:00+07:00",
                    status: "coming-soon"
                },
                {
                    date: "2025-12-15T10:00:00+07:00",
                    status: "coming-soon"
                }
            ],
            details: [
                { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
            ],
            price: { current: "Rp 23.900.000", original: "Rp 26.900.000" },
            buttonLabel: "Detail Paket",
            category: "silver"
        },
        gold: {
            id: "gold",
            image: "/assets/image/packages-umrah/gold/cover-umrah-cerdas-ibadah-fokus.jpg",
            tags: [
                { icon: "clock", label: "9 Hari" },
                { icon: "plus-wisata", label: "Plus Wisata" },
                { icon: "plane", label: "Langsung" },
                { icon: "train", label: "Kereta Cepat" }],
            title: "Umrah Cerdas - Ibadah Fokus",
            departureDate: [],
            details: [
                { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
            ],
            price: { current: "Rp 30.000.000", original: "Rp 35.000.000" },
            buttonLabel: "Detail Paket",
            category: "gold"
        },
        platinum: {
            id: "platinum",
            image: "/assets/image/packages-umrah/platinum/cover-umrah-eksklusif-ibadah-terbaik.jpg",
            tags: [
                { icon: "clock", label: "9 Hari" },
                { icon: "la-kaaba", label: "Reguler" },
                { icon: "plane", label: "Langsung" },
                { icon: "train", label: "Kereta Cepat" }],
            title: "Umrah Eksklusif - Ibadah Terbaik",
            departureDate: [],
            details: [
                { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
            ],
            price: { current: "Rp 40.000.000", original: "Rp 45.000.000" },
            buttonLabel: "Detail Paket",
            category: "platinum"
        }
    },
    packagesContent: {
        silver: {
            header : {
                title: "Umrah Ideal dengan Momen Tak Terlupakan mulai dari 22 jt",
                subtitle: "Sambut Panggilan-Nya"
            },
            packages:[
                {
                    id: "silver",
                    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/be720e15d1575589a7a325038d4b0e925bd1fc85",
                    tags: [
                        { icon: "clock", label: "9 Hari" },
                        { icon: "la-kaaba", label: "Reguler" },
                        { icon: "plane", label: "Langsung" },
                        { icon: "train", label: "Kereta Cepat" }
                    ],
                    title: "Umroh Hemat - Fokus Ibadah",
                    departureDate: [],
                    details: [
                        { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                        { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                        { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
                    ],
                    price: { current: "Rp 23.900.000", original: "Rp 26.900.000" },
                    buttonLabel: "Detail Paket",
                    category: "silver"
                },
                {
                    id: "silver",
                    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/be720e15d1575589a7a325038d4b0e925bd1fc85",
                    tags: [
                        { icon: "clock", label: "9 Hari" },
                        { icon: "la-kaaba", label: "Reguler" },
                        { icon: "plane", label: "Langsung" },
                        { icon: "train", label: "Kereta Cepat" }
                    ],
                    title: "Umroh Hemat - Fokus Ibadah",
                    departureDate: [],
                    details: [
                        { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                        { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                        { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
                    ],
                    price: { current: "Rp 23.900.000", original: "Rp 26.900.000" },
                    buttonLabel: "Detail Paket",
                    category: "silver"
                },
                {
                    id: "silver",
                    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/be720e15d1575589a7a325038d4b0e925bd1fc85",
                    tags: [
                        { icon: "clock", label: "9 Hari" },
                        { icon: "la-kaaba", label: "Reguler" },
                        { icon: "plane", label: "Langsung" },
                        { icon: "train", label: "Kereta Cepat" }
                    ],
                    title: "Umroh Hemat - Fokus Ibadah",
                    departureDate: [],
                    details: [
                        { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                        { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                        { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
                    ],
                    price: { current: "Rp 23.900.000", original: "Rp 26.900.000" },
                    buttonLabel: "Detail Paket",
                    category: "silver"
                }
            ]
        },
        gold: {
            header : {
                title: "Umrah Ideal dengan Momen Tak Terlupakan mulai dari 22 jt",
                subtitle: "Sambut Panggilan-Nya"
            },
            packages:[
                {
                    id: "silver",
                    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/be720e15d1575589a7a325038d4b0e925bd1fc85",
                    tags: [
                        { icon: "clock", label: "9 Hari" },
                        { icon: "la-kaaba", label: "Reguler" },
                        { icon: "plane", label: "Langsung" },
                        { icon: "train", label: "Kereta Cepat" }
                    ],
                    title: "Umroh Hemat - Fokus Ibadah",
                    departureDate: [],
                    details: [
                        { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                        { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                        { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
                    ],
                    price: { current: "Rp 23.900.000", original: "Rp 26.900.000" },
                    buttonLabel: "Detail Paket",
                    category: "gold"
                },
                {
                    id: "silver",
                    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/be720e15d1575589a7a325038d4b0e925bd1fc85",
                    tags: [
                        { icon: "clock", label: "9 Hari" },
                        { icon: "la-kaaba", label: "Reguler" },
                        { icon: "plane", label: "Langsung" },
                        { icon: "train", label: "Kereta Cepat" }
                    ],
                    title: "Umroh Hemat - Fokus Ibadah",
                    departureDate: [],
                    details: [
                        { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                        { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                        { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
                    ],
                    price: { current: "Rp 23.900.000", original: "Rp 26.900.000" },
                    buttonLabel: "Detail Paket",
                    category: "gold"
                },
                {
                    id: "silver",
                    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/be720e15d1575589a7a325038d4b0e925bd1fc85",
                    tags: [
                        { icon: "clock", label: "9 Hari" },
                        { icon: "la-kaaba", label: "Reguler" },
                        { icon: "plane", label: "Langsung" },
                        { icon: "train", label: "Kereta Cepat" }
                    ],
                    title: "Umroh Hemat - Fokus Ibadah",
                    departureDate: [],
                    details: [
                        { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                        { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                        { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
                    ],
                    price: { current: "Rp 23.900.000", original: "Rp 26.900.000" },
                    buttonLabel: "Detail Paket",
                    category: "gold"
                },
                {
                    id: "silver",
                    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/be720e15d1575589a7a325038d4b0e925bd1fc85",
                    tags: [
                        { icon: "clock", label: "9 Hari" },
                        { icon: "la-kaaba", label: "Reguler" },
                        { icon: "plane", label: "Langsung" },
                        { icon: "train", label: "Kereta Cepat" }
                    ],
                    title: "Umroh Hemat - Fokus Ibadah",
                    departureDate: [],
                    details: [
                        { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                        { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                        { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
                    ],
                    price: { current: "Rp 23.900.000", original: "Rp 26.900.000" },
                    buttonLabel: "Detail Paket",
                    category: "gold"
                }
            ]

        },
        platinum: {
            header : {
                title: "Umrah Ideal dengan Momen Tak Terlupakan mulai dari 22 jt",
                subtitle: "Sambut Panggilan-Nya"
            },
            packages:[
                {
                    id: "silver",
                    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/be720e15d1575589a7a325038d4b0e925bd1fc85",
                    tags: [
                        { icon: "clock", label: "9 Hari" },
                        { icon: "la-kaaba", label: "Reguler" },
                        { icon: "plane", label: "Langsung" },
                        { icon: "train", label: "Kereta Cepat" }
                    ],
                    title: "Umroh Hemat - Fokus Ibadah",
                    departureDate: [],
                    details: [
                        { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                        { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                        { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
                    ],
                    price: { current: "Rp 23.900.000", original: "Rp 26.900.000" },
                    buttonLabel: "Detail Paket",
                    category: "platinum"
                },
                {
                    id: "silver",
                    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/be720e15d1575589a7a325038d4b0e925bd1fc85",
                    tags: [
                        { icon: "clock", label: "9 Hari" },
                        { icon: "la-kaaba", label: "Reguler" },
                        { icon: "plane", label: "Langsung" },
                        { icon: "train", label: "Kereta Cepat" }
                    ],
                    title: "Umroh Hemat - Fokus Ibadah",
                    departureDate: [],
                    details: [
                        { icon: "airline", label: "Maskapai", value: "Lion Air", altText: "Airline",  rating:0 },
                        { icon: "hotel", label: "Madinah", value: "Al Marwah Rayhan by Rotana", altText: "Hotel",   rating: 5},
                        { icon: "hotel", label: "Makkah", value: "Anjum Hotel", altText: "Hotel", rating: 5  }
                    ],
                    price: { current: "Rp 23.900.000", original: "Rp 26.900.000" },
                    buttonLabel: "Detail Paket",
                    category: "platinum"

                }
            ]
        }
    },
    featuresContent: {
        header : {
            title: "Berangkat Umroh Bersama goumrah.id",
            subtitle: "Dapatkan Kelebihannya"
        },
        benefits: [
            { id : 1, title: "Pelayanan Terbaik", subtitle: "goumrah.id memberikan pelayanan pemesanan paket umroh dengan fasilitas terbaik untuk setiap jama’ah", logo: "/icons/pelayanan-terbaik.svg" },
            { id : 2, title: "Pemesanan Mudah", subtitle: "Kami berkomitmen memberikan kemudahan untuk setiap pemesanan paket umroh jama’ah dari awal hingga akhir.", logo: "/icons/pemesanan-mudah.svg" },
            { id : 3,  title: "Biaya Transparan", subtitle: "Sering mendapatkan biaya tak terduga saat pesan paket umroh? disini tidak lagi! kami memberikan laporan biaya yang transparan. ", logo: "/icons/biaya-transparan.svg" },
            { id : 4,  title: "Terpercaya", subtitle: "goumrah.id sudah berpengalaman 18 tahun memberangkatkan jama’ah ke Tanah Suci dan sudah berizin PPIU di Kemenag.", logo: "/icons/terpercaya.svg" },
            { id : 5,  title: "Pembayaran Aman", subtitle: "goumrah.id sudah bekerjasama dengan platform pembayaran terpercaya di Indonesia, dan sudah berizin di OJK ataupun Bank Indonesia.", logo: "/icons/pembayaran-aman.svg" },
        ],
        footerTitle : "Jadi, Tunggu apa lagi? Percayakan perjalanan Ibadah Umroh kamu bersama goumrah.id",
        buttonAbout: "Kenalan Yuk sama goumrah.id",
        buttonPackage: "Lihat Semua Paket Umroh",
    },
    momentsContent : {
        header : {
            title: "Abadikan Moment Tak Terlupakan Bersama goumrah.id",
            tagsLine: "#EpicMoment"
        },
        images: [

        ],
    },

    affiliateContent : {
        header : {
            title: "Afiliasi Kami",
            tagsLine: "#EpicMoment"
        },
        affiliates: [
            { name: "Kementerian Agama", logo: "/assets/image/afiliate-logo/kemenag.png", width: 84, height: 66 },
            { name: "Sistem Pengawasan Umrah", logo: "/assets/image/afiliate-logo/siskopatuh.png", width: 84, height: 66 },
            { name: "Komite Akreditasi Nasional", logo: "/assets/image/afiliate-logo/kan.png", width: 84, height: 66 },
            { name: "5 Pasti", logo: "/assets/image/afiliate-logo/5-pasti.png", width: 84, height: 66 },
            { name: "Himpunan Penyelenggara Umrah dan Haji", logo: "/assets/image/afiliate-logo/himpuh-logo.png", width: 84, height: 66 },
            { name: "Association of The Indonesian Tours and Travel Agencies", logo: "/assets/image/afiliate-logo/asita.png", width: 84, height: 66 },
            { name: "Badan Nasional Sertifikasi Profesi", logo: "/assets/image/afiliate-logo/bnsp.png", width: 84, height: 66 },
            { name: "Garuda Indonesia", logo: "/assets/image/afiliate-logo/garuda-indonesia.png", width: 84, height: 66 },
            { name: "Lion Air", logo: "/assets/image/afiliate-logo/lion-air.png", width: 84, height: 66 },
        ]
    },
    testimonialContent: {
        header : {
            title: "Testimoni jama’ah",
            subtitle: "Apa yang para Jama’ah katakan tentang kami"
        },
        reviews: [
            {
                id: 1,
                reviewer: "Ahmad Ali",
                age: 45,
                address: "Jakarta, Indonesia",
                rating: 5,
                review: "Paket umrah ini benar-benar luar biasa. Akomodasi sangat nyaman, dan pemandu sangat berpengalaman serta membantu. Sangat direkomendasikan!",
                date: "2025-01-10T10:00:00+07:00",
            },
            {
                id: 2,
                reviewer: "Fatimah Noor",
                age: 38,
                address: "Bandung, Indonesia",
                rating: 4,
                review: "Secara keseluruhan pengalaman yang sangat baik. Transportasi lancar dan staf sangat ramah. Namun, pilihan makanannya bisa lebih ditingkatkan.",
                date: "2025-01-15T10:00:00+07:00",
            },
            {
                id: 3,
                reviewer: "Yusuf Rahman",
                age: 50,
                address: "Surabaya, Indonesia",
                rating: 5,
                review: "Perjalanan spiritual yang benar-benar luar biasa dan bebas stres berkat paket ini. Semua diatur dengan sempurna dari awal hingga akhir.",
                date: "2024-12-25T10:00:00+07:00",
            },
            {
                id: 4,
                reviewer: "Aisyah Malik",
                age: 30,
                address: "Medan, Indonesia",
                rating: 4.5,
                review: "Pelayanan luar biasa! Pemimpin grup sangat membantu dan memastikan semua jamaah memiliki pengalaman yang lancar. Sangat saya rekomendasikan.",
                date: "2025-01-05T10:00:00+07:00",
            },
            {
                id: 5,
                reviewer: "Muhammad Hasan",
                age: 60,
                address: "Makassar, Indonesia",
                rating: 5,
                review: "Layanan yang sangat baik! Mulai dari pengurusan visa hingga akomodasi, semuanya ditangani dengan sangat profesional.",
                date: "2024-11-30T10:00:00+07:00",
            },
            {
                id: 6,
                reviewer: "Siti Amina",
                age: 42,
                address: "Yogyakarta, Indonesia",
                rating: 4.5,
                review: "Paket ini sangat cocok untuk keluarga. Fasilitasnya bersih, dan pemandu sangat ramah. Jadwalnya juga tidak terlalu padat, sehingga cukup fleksibel.",
                date: "2024-12-10T10:00:00+07:00",
            },
            {
                id: 7,
                reviewer: "Ali Fauzan",
                age: 55,
                address: "Balikpapan, Indonesia",
                rating: 5,
                review: "Saya sangat puas dengan layanan ini. Semua kebutuhan saya selama umrah terpenuhi dengan baik. Terima kasih telah membuat perjalanan ini begitu berkesan.",
                date: "2025-01-01T10:00:00+07:00",
            },
            {
                id: 8,
                reviewer: "Nurul Hidayah",
                age: 36,
                address: "Palembang, Indonesia",
                rating: 4.7,
                review: "Layanan yang sangat profesional. Timnya sangat responsif dan cepat membantu jika ada kebutuhan mendadak. Sungguh pengalaman yang tak terlupakan.",
                date: "2024-03-10T10:00:00+07:00", // Updated to ISO format
            },
            {
                id: 9,
                reviewer: "Rizki Aditya",
                age: 29,
                address: "Denpasar, Indonesia",
                rating: 4.8,
                review: "Sebagai jamaah muda, saya merasa sangat terbantu dengan panduan dan fleksibilitas jadwal yang diberikan. Pengalaman spiritual yang sangat luar biasa.",
                date: "2024-12-20T10:00:00+07:00",
            },
            {
                id: 10,
                reviewer: "Zahra Putri",
                age: 47,
                address: "Banda Aceh, Indonesia",
                rating: 5,
                review: "Sangat puas! Dari mulai keberangkatan hingga pulang, semuanya diurus dengan sangat rapi. Hotelnya nyaman, dan lokasi strategis dekat Haram.",
                date: "2025-01-12T10:00:00+07:00",
            },
        ]
    },
    faqContent:{
        header : {
            title: "Testimoni jama’ah",
            subtitle: "Apa yang para Jama’ah katakan tentang kami"
        },
        faqs: [
            {
                id: 1,
                question: "Apa itu goumrah.id?",
                answer: "Goumrah.id adalah biro perjalanan umroh yang **berizin resmi dari Kementerian Agama RI**. Kami menyediakan berbagai pilihan paket umroh, mulai dari yang hemat hingga eksklusif, untuk memenuhi kebutuhan perjalanan ibadah kamu."
            },
            {
                id: 2,
                question: "Apakah goumrah.id memiliki izin resmi dari Kementerian Agama?",
                answer: "**Ya, goumrah.id memiliki izin resmi** sebagai **Penyelenggara Perjalanan Ibadah Umroh (PPIU)** dari Kementerian Agama RI. Nomor izin kami adalah **No.27052200387740007.**"
            },
            {
                id: 3,
                question: "Dimana lokasi kantor pusat goumrah.id?",
                answer: "Kantor pusat kami berlokasi di **JL. GM Ainul Yakin Blk. A-B No.35, Kalibata, Kec. Pancoran, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12740**, atau bisa [lihat disini.](https://maps.app.goo.gl/fMW2ZttUt9wJcCSz6)"
            }
        ]
    },
    mobileMenu:[
        { label: "Beranda", icon: "HomeIcon", path: "/" },
        { label: "Paket", icon: "KaabaIcon", path: "/paket" },
        { label: "Blog", icon: "BlogIcon", path: "/blog" },
        { label: "FAQ", icon: "FaqIcon", path: "/faq" },
        { label: "About", icon: "AboutIcon", path: "/about" },
    ]


};

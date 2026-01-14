export interface Option {
    id: string;
    text: string;
    image?: string;
    icon?: string;
    subtext?: string;
}

export interface Question {
    id: number;
    part: string;
    question: string;
    type: 'image-card' | 'icon-card' | 'text-card';
    options: Option[];
}

export const questions: Question[] = [
    {
        id: 1,
        part: 'Part 01',
        question: 'Apa yang kamu lakukan saat dikhianati?',
        type: 'image-card',
        options: [
            {
                id: 'revenge',
                text: 'Diam & Balas Dendam',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASzBpQ5H2AYvwUjLx_8o7cYd_ef0mHe2YY2n4xM1mmLa-3h6An3kCSfehC7-wbGZhrXwmZh21PH5G4gJ9wsT2bFShIi_zaqVowTJFkMfVCw37i0PfhctYcsCKYi0WurwyQ9sTVHM44t3OSc-QcGhor9IJrIm3ABSYfMjdYGaHWRutGGQWjeFoIunn6iFRxtDPygyPElR8phve9f_Psa0yyMavNI8VJ45Ram_UBaOWknyKQ8ZDouQXkKtQGKapPxUQUmMw5yoxtSZQ'
            },
            {
                id: 'cry',
                text: 'Menangis di Pojok',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvKioX7fb65yHgVCCK39NjvJzqOKvVKjdBHrhBfOeuNeTAqfFEPtUdvyFtw4ZjLIC8L30KYxw7985CqOexSBma7anLCUk6gnf9R98LmGOKBDvU29boCxTDVIb9MOAzBjsNIz67xFAGzNtFD9ZZMOLgztTE0tKPt6QPKdsQ2-CixrXnLYKASoxRNiUTCk99cd7CRZwfQ-UYE3AdTNMpt3qIVom5SLYd59izKu8U-2GpwTwwJ-UqDfMExaPsS6_t6lsewPZdWmtDKF4'
            },
            {
                id: 'forget',
                text: 'Lupakan Saja',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZe9zJFwRFeR7lQxsIoSycriY2AF_XJypcYOs3bHnq0Yn-HbaFZM2FoJvLToEhJSESlPoSdIcLNGuoP73a-hFiRzSSTQ_wgvs5v2FdoQtR_aTevHmM-8LIeLu0ikziLCi14mSsIXveZYJFXYIGmBQNeZwRLdWWiBCZZHjrPGa6z-T4bMYwgZv2IlWmQBeh2vG1a8E7nGRi_RAW2jG3y8jm3aHtWUnqd562Z0Bb8wWZ1MH_gz1nDobngLXfBXonPRU0LqoC7-_iQKM'
            }
        ]
    },
    {
        id: 2,
        part: 'Part 02',
        question: 'Ketakutan terbesarmu adalah...',
        type: 'icon-card',
        options: [
            {
                id: 'lonely',
                text: 'Kesepian',
                icon: 'Users'
            },
            {
                id: 'failure',
                text: 'Kegagalan',
                icon: 'TrendingDown'
            },
            {
                id: 'judged',
                text: 'Dihakimi',
                icon: 'EyeOff'
            }
        ]
    },
    {
        id: 3,
        part: 'Part 03',
        question: 'Bagaimana cara dunia melihatmu?',
        type: 'text-card',
        options: [
            {
                id: 'mysterious',
                text: 'Misterius',
                subtext: 'Mereka tidak pernah benar-benar tahu apa yang ada di kepalamu.'
            },
            {
                id: 'fake',
                text: 'Ceria (Palsu)',
                subtext: 'Topengmu sempurna, tak ada yang melihat retakannya.'
            },
            {
                id: 'normal',
                text: 'Biasa Saja',
                subtext: 'Bersembunyi di balik keramaian adalah keahlianmu.'
            }
        ]
    }
];

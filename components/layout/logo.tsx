import { cn } from '@/lib/utils'

export const Logo = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn('text-foreground h-6 w-6', className)}
                aria-label="Car logo"
                role="img"
                tabIndex={0}
            >
                <rect width="30" height="30" fill="none" />
                <path
                    d="M3 17V15.5C3 14.1193 4.11929 13 5.5 13H18.5C19.8807 13 21 14.1193 21 15.5V17M3 17H2.5C2.22386 17 2 16.7761 2 16.5V15.5C2 14.1193 3.11929 13 4.5 13H19.5C20.8807 13 22 14.1193 22 15.5V16.5C22 16.7761 21.7761 17 21.5 17H21M3 17V18.5C3 19.3284 3.67157 20 4.5 20C5.32843 20 6 19.3284 6 18.5V17M21 17V18.5C21 19.3284 20.3284 20 19.5 20C18.6716 20 18 19.3284 18 18.5V17M7 17A1 1 0 1 1 7 19A1 1 0 0 1 7 17ZM17 17A1 1 0 1 1 17 19A1 1 0 0 1 17 17ZM5 13L7.6 7.24C7.87271 6.69234 8.42413 6.3273 9.05279 6.33738L15.0215 6.43239C15.6417 6.44232 16.1775 6.83263 16.3807 7.38417L18.5 13H5Z"
                    stroke={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <defs>
                    <linearGradient
                        id="logo-gradient"
                        x1="2"
                        y1="6"
                        x2="22"
                        y2="20"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#2563eb" />
                        <stop offset="1" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>
            <span className="text-2xl font-semibold">
                Drive Ease
            </span>
        </div>
    )
}

export const LogoIcon = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('size-5', className)}>
            <path
                d="M2.5 17.5V16C2.5 14.6193 3.61929 13.5 5 13.5H19C20.3807 13.5 21.5 14.6193 21.5 16V17.5M2.5 17.5H2C1.72386 17.5 1.5 17.2761 1.5 17V16C1.5 14.6193 2.61929 13.5 4 13.5H20C21.3807 13.5 22.5 14.6193 22.5 16V17C22.5 17.2761 22.2761 17.5 22 17.5H21.5M2.5 17.5V19C2.5 19.8284 3.17157 20.5 4 20.5C4.82843 20.5 5.5 19.8284 5.5 19V17.5M21.5 17.5V19C21.5 19.8284 20.8284 20.5 20 20.5C19.1716 20.5 18.5 19.8284 18.5 19V17.5M6 17.5A0.5 0.5 0 1 1 6 18.5A0.5 0.5 0 0 1 6 17.5ZM18 17.5A0.5 0.5 0 1 1 18 18.5A0.5 0.5 0 0 1 18 17.5ZM4 13.5L6.4 8.24C6.67271 7.69234 7.22413 7.3273 7.85279 7.33738L13.5215 7.43239C14.1417 7.44232 14.6775 7.83263 14.8807 8.38417L17 13.5H4Z"
                stroke={uniColor ? 'currentColor' : 'url(#logo-icon-gradient)'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <defs>
                <linearGradient
                    id="logo-icon-gradient"
                    x1="2"
                    y1="7"
                    x2="22"
                    y2="21"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#3b82f6" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export const LogoStroke = ({ className }: { className?: string }) => {
    return (
        <svg
            className={cn('size-7 w-7', className)}
            viewBox="0 0 71 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M61.25 1.625L70.75 1.5625C70.75 4.77083 70.25 7.79167 69.25 10.625C68.2917 13.4583 66.8958 15.9583 65.0625 18.125C63.2708 20.25 61.125 21.9375 58.625 23.1875C56.1667 24.3958 53.4583 25 50.5 25C46.875 25 43.6667 24.2708 40.875 22.8125C38.125 21.3542 35.125 19.2083 31.875 16.375C29.75 14.4167 27.7917 12.8958 26 11.8125C24.2083 10.7292 22.2708 10.1875 20.1875 10.1875C18.0625 10.1875 16.25 10.7083 14.75 11.75C13.25 12.75 12.0833 14.1875 11.25 16.0625C10.4583 17.9375 10.0625 20.1875 10.0625 22.8125L0 22.9375C0 19.6875 0.479167 16.6667 1.4375 13.875C2.4375 11.0833 3.83333 8.64583 5.625 6.5625C7.41667 4.47917 9.54167 2.875 12 1.75C14.5 0.583333 17.2292 0 20.1875 0C23.8542 0 27.1042 0.770833 29.9375 2.3125C32.8125 3.85417 35.7708 5.97917 38.8125 8.6875C41.1042 10.7708 43.1042 12.3333 44.8125 13.375C46.5625 14.375 48.4583 14.875 50.5 14.875C52.6667 14.875 54.5417 14.3125 56.125 13.1875C57.75 12.0625 59 10.5 59.875 8.5C60.7917 6.5 61.25 4.20833 61.25 1.625Z"
                fill="none"
                strokeWidth={0.5}
                stroke="currentColor"
            />
        </svg>
    )
}


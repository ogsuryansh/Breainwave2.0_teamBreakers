import { useState, useEffect } from 'react'

export default function Sidebar() {
    const [activeSection, setActiveSection] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight

            if (scrollPosition < windowHeight * 0.5) {
                setActiveSection(0)
            } else if (scrollPosition < windowHeight * 1.5) {
                setActiveSection(1)
            } else {
                setActiveSection(2)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const sections = ['00', '01', '02', '03', '04', '05', '06']

    return (
        <div className={`fixed left-0 top-0 h-screen w-16 flex flex-col justify-center items-center space-y-6 z-40 transition-opacity duration-500 ${activeSection === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-black/20 backdrop-blur-sm border-r border-white/5'}`}>
            {sections.map((num, idx) => (
                <div
                    key={num}
                    className={`text-xs font-mono transition-all duration-300 cursor-pointer ${idx === activeSection
                        ? 'text-midnight-primary font-bold scale-125'
                        : 'text-gray-600 hover:text-midnight-primary'
                        }`}
                >
                    {num}
                </div>
            ))}
        </div>
    )
}

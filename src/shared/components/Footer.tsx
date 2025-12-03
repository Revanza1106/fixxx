import logo from  '../../assets/logo.png';

const Footer = () => {
    return (
    <footer className="w-full bg-white border-t mt-20 py-10">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-[#000053]">
                <div>
                <img src={logo} alt="PCP Transport" className="h-8 mb-4" />
                <p className="text-sm text-gray-600 leading-relaxed">
                Domestic trucking and ocean freight backed by PCP Transport Nationwide network.
                </p>
                </div>

                <div>
                    <h3 className="font-bold mb-3 text-[#000053]">SERVICE</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>Full Container Load (FCL)</li>
                        <li>Full Truck Load (FTL)</li>
                        <li>Heavy Machinery Transport</li>
                        <li>Real-time Tracking</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-3 text-[#000053]">COMPANY</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>About PCP Transport</li>
                        <li>Coverage Area</li>
                        <li>EDI Solutions</li>
                        <li>Careers</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-3 text-[#000053]">CONTACT</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>📞 +62 21 1234 5678</li>
                        <li>✉️ sales@pcp.co.id</li>
                        <li>📍 Jakarta, Indonesia</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
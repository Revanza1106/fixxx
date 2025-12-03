import { Link } from 'react-router-dom';
import img from '../../assets/perahu-konteiner.jpg';

const HeroSection = () => {
  return (
    <div className='pt-5'>
        <section className="relative w-full bg-[#F4F9FF] overflow-hidden">
            <div className="container mx-auto px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">

            <div className="z-10 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#001F54] leading-tight">
                Domestic Logistics Built
                <br />
                For Indonesia’s Scale
                </h1>

                <p className="text-gray-600 mt-4 max-w-md mx-auto md:mx-0">
        Simplify your shipping process and make it more efficient with our
        cargo services. From start to finish, we’ll handle everything to
        ensure your cargo arrives safely.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
        <Link
            to="/track"
            className="bg-[#00C300] text-[#001F54] px-6 py-3 rounded-lg font-semibold shadow hover:opacity-90 transition w-full sm:w-auto"
        >
            Track & Trace →
        </Link>

        <Link
            to="/check-ongkir"
            className="text-[#001F54] border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition w-full sm:w-auto"
        >
            Check Shipping
        </Link>
        </div>
    </div>

            <div className="relative hidden md:block">
                <img
                src={img}
                alt="Logistics Truck"
                className="w-full object-cover opacity-90 rounded-lg"
                />
            </div>
            </div>

        </section>
    </div>
  )
}

export default HeroSection
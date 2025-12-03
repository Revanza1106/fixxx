const NationalSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-4">National Reach–Urban To Remote</h2>
      <p className="text-gray-600 mb-6 max-w-2xl">
        With 100+ branches and coverage in 6,800+ sub-districts, we connect factories, ports, hospitals, and retail hubs.
      </p>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.283860062187!2d106.923418!3d-6.221233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b1ff4855555%3A0x3dc086b44ddcb6!2sPCP%20Transport%20(PT.%20Yapindo%20Transportama)!5e0!3m2!1sid!2sid!4v1733048300000!5m2!1sid!2sid"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-xl"
      />

      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold text-[#001F54] mb-2">Our Location:</h3>
        <p className="text-gray-700 mb-4">
          Jalan Pulo Gadung Raya No.26, Kawasan JIEP, Kel, RW.9, Jatinegara, Kec. Cakung, Kota Jkt Timur, Daerah Khusus Ibukota Jakarta 13930
        </p>

        <a
          href="https://www.google.com/maps/search/?api=1&query=PCP+Transport+(PT.+Yapindo+Transportama)"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#001F54] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001F54]"
        >
          Open in Google Maps
        </a>
      </div>
    </section>
  )
}

export default NationalSection
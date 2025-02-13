export default function ExploreLocations() {
    return (
      <div className="w-full mx-auto bg-gray-200">
        {/* Main Locations Section */}
        <section className="mb-12">
          <h1 className="text-3xl font-semibold mb-8 p-4">
            Explore other options in and around Jabalpur
          </h1>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <h2 className="font-medium">Kanha</h2>
                <p className="text-gray-600">Holiday rentals</p>
              </div>
              <div>
                <h2 className="font-medium">Tamia</h2>
                <p className="text-gray-600">Holiday rentals</p>
              </div>
              <div>
                <h2 className="font-medium">Balaghat</h2>
                <p className="text-gray-600">Holiday rentals</p>
              </div>
            </div>
  
            {/* Column 2 */}
            <div className="space-y-6 p-4">
              <div>
                <h2 className="font-medium">Kila Bandhogarh</h2>
                <p className="text-gray-600">Holiday rentals</p>
              </div>
              <div>
                <h2 className="font-medium">Katni</h2>
                <p className="text-gray-600">Holiday rentals</p>
              </div>
              <div>
                <h2 className="font-medium">Umariya</h2>
                <p className="text-gray-600">Holiday rentals</p>
              </div>
            </div>
  
            {/* Column 3 */}
            <div className="space-y-6 p-4">
              <div>
                <h2 className="font-medium">Bhedaghat</h2>
                <p className="text-gray-600">Holiday rentals</p>
              </div>
              <div>
                <h2 className="font-medium">Umaria</h2>
                <p className="text-gray-600">Holiday rentals</p>
              </div>
              <div>
                <h2 className="font-medium">Mukki</h2>
                <p className="text-gray-600">Holiday rentals</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Other Types Section */}
        <section className="mb-12 p-4">
          <h2 className="text-2xl font-semibold mb-8">Other types of stays on SuperHomess</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <p className="hover:underline cursor-pointer">Jabalpur holiday rentals</p>
              <p className="hover:underline cursor-pointer">Pet-friendly holiday rentals in Madhya Pradesh</p>
              <p className="hover:underline cursor-pointer">Family-friendly holiday rentals in India</p>
            </div>
            <div className="space-y-4">
              <p className="hover:underline cursor-pointer">Jabalpur monthly stays</p>
              <p className="hover:underline cursor-pointer">Apartment holiday rentals in Madhya Pradesh</p>
              <p className="hover:underline cursor-pointer">Pet-friendly holiday rentals in India</p>
            </div>
            <div className="space-y-4">
              <p className="hover:underline cursor-pointer">Pet-friendly holiday rentals in Jabalpur</p>
              <p className="hover:underline cursor-pointer">Family-friendly holiday rentals in Madhya Pradesh</p>
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t p-4">
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-3">
              <p className="text-gray-600 hover:underline cursor-pointer">Help Centre</p>
              <p className="text-gray-600 hover:underline cursor-pointer">AirCover</p>
              <p className="text-gray-600 hover:underline cursor-pointer">Anti-discrimination</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Hosting</h3>
            <div className="space-y-3">
              <p className="text-gray-600 hover:underline cursor-pointer">SuperHomess your home</p>
              <p className="text-gray-600 hover:underline cursor-pointer">AirCover for Hosts</p>
              <p className="text-gray-600 hover:underline cursor-pointer">Hosting resources</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">SuperHomess</h3>
            <div className="space-y-3">
              <p className="text-gray-600 hover:underline cursor-pointer">Newsroom</p>
              <p className="text-gray-600 hover:underline cursor-pointer">New features</p>
              <p className="text-gray-600 hover:underline cursor-pointer">Careers</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  
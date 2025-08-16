export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Nexus AI</h1>
              <span className="ml-2 text-sm text-gray-500">Company Intelligence</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-green-600 font-medium">✅ Production Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Nexus AI
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered company intelligence platform for uncovering ownership structures and risk analysis
          </p>
          
          {/* Status Card */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">System Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-green-800">Framework</div>
                <div className="text-lg font-bold text-green-900">Next.js 15.4.6</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-800">React</div>
                <div className="text-lg font-bold text-blue-900">18.3.1</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-purple-800">TypeScript</div>
                <div className="text-lg font-bold text-purple-900">5.9.2</div>
              </div>
              <div className="bg-cyan-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-cyan-800">Tailwind CSS</div>
                <div className="text-lg font-bold text-cyan-900">3.4.17</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/search" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              🔍 Search Companies
            </a>
            <a 
              href="/api-test" 
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              🚀 Test API Integration
            </a>
            <a 
              href="/minimal" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              View Ground Rules Test
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Nexus AI - Built with Next.js, deployed on Vercel</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
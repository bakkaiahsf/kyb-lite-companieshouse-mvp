export default function MinimalTest() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'green', fontSize: '2rem' }}>
        ✅ SUCCESS: Basic Next.js Working!
      </h1>
      <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
        Ground Rules Established:
      </p>
      <ul style={{ fontSize: '1rem', lineHeight: '1.5' }}>
        <li>✅ Next.js 15.4.6 - Compatible</li>
        <li>✅ React 18.3.1 - Stable</li>
        <li>✅ TypeScript 5.6.3 - Working</li>
        <li>✅ Tailwind CSS 3.4.14 - Compatible</li>
        <li>✅ Node.js 20.19.4 - Supported</li>
      </ul>
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f0f9ff', 
        border: '1px solid #0ea5e9',
        borderRadius: '0.5rem'
      }}>
        <strong>Next Steps:</strong> Gradually add features with compatible versions only
      </div>
    </div>
  )
}
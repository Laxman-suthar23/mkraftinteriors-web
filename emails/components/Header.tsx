export default function Header() {
  return (
    <tr>
      <td style={{ 
        backgroundColor: '#1a1a1a', 
        padding: '30px 40px',
        textAlign: 'center' as const
      }}>
        <table role="presentation" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td align="center">
                <h1 style={{
                  color: '#ffffff',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  margin: 0,
                  letterSpacing: '1px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
                }}>
                  Karni Interiors
                </h1>
                <p style={{
                  color: '#cccccc',
                  fontSize: '14px',
                  margin: '8px 0 0',
                  letterSpacing: '0.5px',
                }}>
                  Premium Interior Design Services
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <tr>
      <td style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '30px 40px',
        borderTop: '1px solid #e9ecef'
      }}>
        <table role="presentation" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td align="center">
                <p style={{
                  color: '#6c757d',
                  fontSize: '14px',
                  margin: '0 0 16px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
                }}>
                  Follow us on social media
                </p>
                
                <table role="presentation" style={{ margin: '0 auto 20px' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '0 8px' }}>
                        <a 
                          href="https://instagram.com/karniinteriors" 
                          style={{ 
                            color: '#007bff', 
                            textDecoration: 'none',
                            fontSize: '14px'
                          }}
                        >
                          Instagram
                        </a>
                      </td>
                      <td style={{ padding: '0 8px' }}>
                        <a 
                          href="https://facebook.com/karniinteriors" 
                          style={{ 
                            color: '#007bff', 
                            textDecoration: 'none',
                            fontSize: '14px'
                          }}
                        >
                          Facebook
                        </a>
                      </td>
                      <td style={{ padding: '0 8px' }}>
                        <a 
                          href="https://linkedin.com/company/karniinteriors" 
                          style={{ 
                            color: '#007bff', 
                            textDecoration: 'none',
                            fontSize: '14px'
                          }}
                        >
                          LinkedIn
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div style={{
                  borderTop: '1px solid #dee2e6',
                  paddingTop: '20px',
                  textAlign: 'center' as const
                }}>
                  <p style={{
                    color: '#6c757d',
                    fontSize: '12px',
                    margin: '0 0 8px',
                    lineHeight: '1.4',
                  }}>
                    Karni Interiors<br />
                    123 Design District, Suite 456<br />
                    Los Angeles, CA 90028
                  </p>
                  
                  <p style={{
                    color: '#6c757d',
                    fontSize: '12px',
                    margin: '0 0 8px',
                  }}>
                    <a 
                      href="mailto:info@karniinteriors.com" 
                      style={{ color: '#007bff', textDecoration: 'none' }}
                    >
                      info@karniinteriors.com
                    </a> | 
                    <a 
                      href="tel:+1555123456" 
                      style={{ color: '#007bff', textDecoration: 'none', marginLeft: '4px' }}
                    >
                      (555) 123-4567
                    </a>
                  </p>

                  <p style={{
                    color: '#6c757d',
                    fontSize: '11px',
                    margin: '16px 0 0',
                    lineHeight: '1.4',
                  }}>
                    © {currentYear} Karni Interiors. All rights reserved.<br />
                    You received this email because you contacted us or subscribed to our updates.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface EmailLayoutProps {
  children: ReactNode;
  title?: string;
  previewText?: string;
}

export default function EmailLayout({ 
  children, 
  title = "Karni Interiors",
  previewText 
}: EmailLayoutProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        {previewText && (
          <div style={{ 
            display: 'none', 
            fontSize: '1px', 
            color: '#333333', 
            lineHeight: '1px', 
            maxHeight: '0px', 
            maxWidth: '0px', 
            opacity: 0, 
            overflow: 'hidden' 
          }}>
            {previewText}
          </div>
        )}
      </head>
      <body style={{
        backgroundColor: '#f6f9fc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
        margin: 0,
        padding: 0,
      }}>
        <table
          role="presentation"
          style={{
            width: '100%',
            backgroundColor: '#f6f9fc',
            margin: 0,
            padding: 0,
          }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: '0' }}>
                <table
                  role="presentation"
                  style={{
                    maxWidth: '600px',
                    width: '100%',
                    backgroundColor: '#ffffff',
                    margin: '20px auto',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <tbody>
                    <Header />
                    <tr>
                      <td style={{ padding: '40px 40px 20px' }}>
                        {children}
                      </td>
                    </tr>
                    <Footer />
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

export function ButtonsVsLinksArticle() {
  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '3rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6',
      color: '#1f2937'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '700',
        color: '#111827'
      }}>
        Buttons vs links: semantic guide
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        Choosing the right HTML element is not just about how it looks. It is about how it works for people. Using the correct tag ensures that screen readers, keyboards, and search engines understand our interface.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        marginTop: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '600',
        color: '#111827'
      }}>
        The core principle
      </h2>
      
      <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
        To choose the right element, ask yourself one simple question: <strong>"Where is the user going, or what are they doing?"</strong>
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginTop: '2rem',
        marginBottom: '2rem',
        border: '1px solid #e5e7eb'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb' }}>
            <th style={{ 
              padding: '1rem', 
              textAlign: 'left', 
              fontWeight: '600',
              borderBottom: '2px solid #e5e7eb',
              color: '#111827'
            }}>
              If the user is...
            </th>
            <th style={{ 
              padding: '1rem', 
              textAlign: 'left', 
              fontWeight: '600',
              borderBottom: '2px solid #e5e7eb',
              color: '#111827'
            }}>
              Use this element
            </th>
            <th style={{ 
              padding: '1rem', 
              textAlign: 'left', 
              fontWeight: '600',
              borderBottom: '2px solid #e5e7eb',
              color: '#111827'
            }}>
              Component name
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem' }}>Moving to a new page or section</td>
            <td style={{ padding: '1rem' }}>
              <code style={{ 
                background: '#f3f4f6', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontFamily: 'monospace'
              }}>
                &lt;a&gt;
              </code>
            </td>
            <td style={{ padding: '1rem' }}>Link or NavigationItem</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem' }}>Changing data or the current page</td>
            <td style={{ padding: '1rem' }}>
              <code style={{ 
                background: '#f3f4f6', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontFamily: 'monospace'
              }}>
                &lt;button&gt;
              </code>
            </td>
            <td style={{ padding: '1rem' }}>Button or IconButton</td>
          </tr>
        </tbody>
      </table>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        marginTop: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '600',
        color: '#111827'
      }}>
        Why semantics matter
      </h2>

      <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
        Using the right tag is essential for a professional and accessible experience.
      </p>

      <ul style={{ 
        listStyle: 'none', 
        padding: '0',
        marginBottom: '2rem'
      }}>
        <li style={{ 
          marginBottom: '1rem',
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            fontWeight: '600',
            color: '#2563eb'
          }}>•</span>
          <strong>Screen readers:</strong> These tools tell users what an element is. A "button" tells users to expect an action, while a "link" tells them to expect a new location.
        </li>
        <li style={{ 
          marginBottom: '1rem',
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            fontWeight: '600',
            color: '#2563eb'
          }}>•</span>
          <strong>Keyboard use:</strong> Buttons can be clicked using both the Enter and Space keys. Links generally only respond to the Enter key.
        </li>
        <li style={{ 
          marginBottom: '1rem',
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            fontWeight: '600',
            color: '#2563eb'
          }}>•</span>
          <strong>Browser features:</strong> Links allow users to right-click and "Open in new tab." Buttons do not.
        </li>
        <li style={{ 
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            fontWeight: '600',
            color: '#2563eb'
          }}>•</span>
          <strong>SEO:</strong> Search engines follow links to find new pages on our site. They ignore buttons.
        </li>
      </ul>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        marginTop: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '600',
        color: '#111827'
      }}>
        Decision tree
      </h2>

      <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
        Follow this logic to choose the correct component for your task:
      </p>

      <div style={{ 
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '0.75rem',
            color: '#111827'
          }}>
            Does it navigate to a new URL?
          </div>
          <div style={{ 
            paddingLeft: '1.5rem',
            borderLeft: '3px solid #22c55e',
            marginLeft: '0.5rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem'
          }}>
            <div style={{ fontWeight: '600', color: '#22c55e', marginBottom: '0.5rem' }}>
              → Yes: Use a Link (<code style={{ 
                background: '#dcfce7', 
                padding: '0.125rem 0.375rem', 
                borderRadius: '0.25rem',
                fontSize: '0.875rem'
              }}>&lt;a&gt;</code>).
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Examples: Navigation menus, breadcrumbs, "Learn more" text.
            </div>
          </div>
        </div>

        <div>
          <div style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginBottom: '0.75rem',
            color: '#111827'
          }}>
            Does it perform an action without leaving the page?
          </div>
          <div style={{ 
            paddingLeft: '1.5rem',
            borderLeft: '3px solid #3b82f6',
            marginLeft: '0.5rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem'
          }}>
            <div style={{ fontWeight: '600', color: '#3b82f6', marginBottom: '0.5rem' }}>
              → Yes: Use a Button (<code style={{ 
                background: '#dbeafe', 
                padding: '0.125rem 0.375rem', 
                borderRadius: '0.25rem',
                fontSize: '0.875rem'
              }}>&lt;button&gt;</code>).
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Examples: Submitting forms, opening a pop-up (modal), toggling dark mode.
            </div>
          </div>
        </div>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        marginTop: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '600',
        color: '#111827'
      }}>
        Component usage: do's and don'ts
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          background: '#dcfce7',
          border: '1px solid #86efac',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginTop: '0',
            marginBottom: '1rem',
            color: '#166534'
          }}>
            Do
          </h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: '0',
            margin: '0'
          }}>
            <li style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              ✅ Use a Link for the main menu.
            </li>
            <li style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              ✅ Use a Button to save a form.
            </li>
            <li style={{ fontSize: '0.95rem' }}>
              ✅ Keep the "Open in new tab" feature for links.
            </li>
          </ul>
        </div>

        <div style={{ 
          background: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            marginTop: '0',
            marginBottom: '1rem',
            color: '#991b1b'
          }}>
            Don't
          </h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: '0',
            margin: '0'
          }}>
            <li style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              ❌ Use a Button to go to the "Home" page.
            </li>
            <li style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              ❌ Use a Link to trigger a delete action.
            </li>
            <li style={{ fontSize: '0.95rem' }}>
              ❌ Use JavaScript to make a button act like a link.
            </li>
          </ul>
        </div>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        marginTop: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '600',
        color: '#111827'
      }}>
        Accessibility requirements
      </h2>

      <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
        Every interactive element must meet these basic standards to ensure everyone can use our products:
      </p>

      <ul style={{ 
        listStyle: 'none', 
        padding: '0',
        marginBottom: '2rem'
      }}>
        <li style={{ 
          marginBottom: '1rem',
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            fontWeight: '600',
            color: '#2563eb'
          }}>•</span>
          <strong>Clear labels:</strong> The text must describe exactly what will happen (e.g., "Save changes" instead of just "Go").
        </li>
        <li style={{ 
          marginBottom: '1rem',
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            fontWeight: '600',
            color: '#2563eb'
          }}>•</span>
          <strong>Correct roles:</strong> Never use a <code style={{ 
            background: '#f3f4f6', 
            padding: '0.125rem 0.375rem', 
            borderRadius: '0.25rem',
            fontSize: '0.875rem'
          }}>&lt;div&gt;</code> or <code style={{ 
            background: '#f3f4f6', 
            padding: '0.125rem 0.375rem', 
            borderRadius: '0.25rem',
            fontSize: '0.875rem'
          }}>&lt;span&gt;</code> for an action; always use a native <code style={{ 
            background: '#f3f4f6', 
            padding: '0.125rem 0.375rem', 
            borderRadius: '0.25rem',
            fontSize: '0.875rem'
          }}>&lt;a&gt;</code> or <code style={{ 
            background: '#f3f4f6', 
            padding: '0.125rem 0.375rem', 
            borderRadius: '0.25rem',
            fontSize: '0.875rem'
          }}>&lt;button&gt;</code>.
        </li>
        <li style={{ 
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            fontWeight: '600',
            color: '#2563eb'
          }}>•</span>
          <strong>Visual focus:</strong> Every button and link must have a clear "focus state" so keyboard users can see where they are.
        </li>
      </ul>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        marginTop: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '600',
        color: '#111827'
      }}>
        Competitive standards
      </h2>

      <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
        We follow the same high standards as the world's leading design systems.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '1rem'
        }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginTop: '0',
            marginBottom: '0.75rem',
            color: '#111827'
          }}>
            GOV.UK
          </h3>
          <blockquote style={{ 
            margin: '0',
            paddingLeft: '1rem',
            borderLeft: '3px solid #6b7280',
            fontStyle: 'italic',
            color: '#6b7280'
          }}>
            Research shows that using buttons as links confuses people using screen readers.
          </blockquote>
        </div>

        <div style={{ 
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '1rem'
        }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginTop: '0',
            marginBottom: '0.75rem',
            color: '#111827'
          }}>
            Shopify (Polaris)
          </h3>
          <blockquote style={{ 
            margin: '0',
            paddingLeft: '1rem',
            borderLeft: '3px solid #6b7280',
            fontStyle: 'italic',
            color: '#6b7280'
          }}>
            Links are for navigation; buttons are for actions. No exceptions.
          </blockquote>
        </div>

        <div style={{ 
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            marginTop: '0',
            marginBottom: '0.75rem',
            color: '#111827'
          }}>
            Google (Material)
          </h3>
          <blockquote style={{ 
            margin: '0',
            paddingLeft: '1rem',
            borderLeft: '3px solid #6b7280',
            fontStyle: 'italic',
            color: '#6b7280'
          }}>
            Do not use buttons to navigate. It breaks user expectations.
          </blockquote>
        </div>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        marginTop: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '600',
        color: '#111827'
      }}>
        Our implementation
      </h2>

      <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
        We have updated our internal library to fix previous mistakes where buttons were used for navigation.
      </p>

      <div style={{ 
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          marginTop: '0',
          marginBottom: '1rem',
          color: '#1e40af'
        }}>
          The NavigationItem component
        </h3>
        <p style={{ margin: '0', lineHeight: '1.75' }}>
          This component is built specifically for our sidebar. It looks like a button to match our brand, but it uses the semantic <code style={{ 
            background: 'rgba(0,0,0,0.1)', 
            padding: '0.125rem 0.375rem', 
            borderRadius: '0.25rem',
            fontSize: '0.875rem'
          }}>&lt;a&gt;</code> tag underneath. This gives us the "best of both worlds": a beautiful design and perfect accessibility.
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        marginTop: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '600',
        color: '#111827'
      }}>
        Summary checklist
      </h2>

      <ul style={{ 
        listStyle: 'none', 
        padding: '0',
        marginBottom: '2rem'
      }}>
        <li style={{ 
          marginBottom: '0.75rem',
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            color: '#6b7280'
          }}>☐</span>
          Does the element have a valid href if it's a link?
        </li>
        <li style={{ 
          marginBottom: '0.75rem',
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            color: '#6b7280'
          }}>☐</span>
          Does the screen reader announce the correct role?
        </li>
        <li style={{ 
          marginBottom: '0.75rem',
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            color: '#6b7280'
          }}>☐</span>
          Can a keyboard user reach and trigger the element?
        </li>
        <li style={{ 
          paddingLeft: '1.5rem',
          position: 'relative'
        }}>
          <span style={{ 
            position: 'absolute', 
            left: '0',
            color: '#6b7280'
          }}>☐</span>
          Does right-clicking work as expected for navigation?
        </li>
      </ul>

      <div style={{ 
        background: '#f9fafb',
        borderTop: '2px solid #e5e7eb',
        padding: '1.5rem',
        marginTop: '3rem',
        fontSize: '0.875rem',
        color: '#6b7280',
        textAlign: 'center'
      }}>
        Last updated: October 2023 • Compliance: WCAG 2.2 AA
      </div>
    </div>
  )
}

import type { Metadata } from 'next';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ParishVox — Digital Content Analysis for Catholic Parishes',
    template: '%s — ParishVox',
  },
  description:
    'ParishVox is the digital content analysis platform for Catholic parishes and cathedrals. Search, compare, and benchmark how parishes use their websites to welcome newcomers, publish bulletins, and invite people into the life of the Church.',
  keywords: [
    'Catholic parish website analysis',
    'parish marketing intelligence',
    'cathedral website audit',
    'ParishVox',
  ],
  authors: [{ name: 'ParishVox' }],
  creator: 'ParishVox',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://getparishvox.com'),
  openGraph: {
    type: 'website',
    siteName: 'ParishVox',
    title: 'ParishVox — Digital Content Analysis for Catholic Parishes',
    description: 'Search, compare, and analyze how Catholic parishes and cathedrals tell their story online.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ParishVox — Digital Content Analysis for Catholic Parishes',
    description: 'The digital content analysis platform for Catholic parishes.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ClerkProvider>
      </body>
    </html>
  );
}

function SiteHeader() {
  const link = {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: 'var(--parchment-dark)',
    padding: '6px 10px',
    borderRadius: 'var(--radius)',
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
  };

  return (
    <header
      style={{
        background: 'var(--navy)',
        borderBottom: '1px solid var(--navy-mid)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', gap: '0.5rem' }}
      >
        <a href="/" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', flexShrink: 0, gap: '2px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1 }}>
            Parish<span style={{ color: '#d98c8c' }}>Vox</span>
          </span>
          <span style={{ fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', lineHeight: 1 }}>
            Digital Content Analysis for Catholic Parishes
          </span>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
          <a href="/search" style={link}>Search</a>
          <a href="/cathedrals" style={link}>Cathedrals</a>
          <a href="/dioceses" style={link}>Dioceses</a>
          <a href="/exemplars" style={link}>Exemplars</a>
          <a href="/solutions" style={link}>Solutions</a>
          <a href="/pricing" style={link}>Pricing</a>
          <AuthControls linkStyle={link} />
        </nav>
      </div>
    </header>
  );
}

function AuthControls({ linkStyle }: { linkStyle: React.CSSProperties }) {
  const signUpStyle: React.CSSProperties = {
    ...linkStyle,
    background: 'var(--red)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginLeft: '6px',
  };
  const signInStyle: React.CSSProperties = {
    ...linkStyle,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  };

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '6px' }}>
      <SignedOut>
        <SignInButton>
          <button type="button" style={signInStyle}>Sign in</button>
        </SignInButton>
        <SignUpButton>
          <button type="button" style={signUpStyle}>Sign up</button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <a href="/favorites" style={linkStyle}>Favorites</a>
        <a href="/to-do" style={linkStyle}>To-Do</a>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </span>
  );
}

function SiteFooter() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'var(--parchment-dark)', padding: '2.5rem 0', marginTop: '2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff' }}>
            Parish<span style={{ color: '#d98c8c' }}>Vox</span>
          </div>
          <p style={{ color: 'var(--ink-faint)', fontSize: '0.85rem', maxWidth: '24rem' }}>
            Content intelligence for the people who build parish and cathedral websites —
            designers, content marketers, agencies, and diocesan communications teams.
          </p>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a href="/search">Search</a>
            <a href="/cathedrals">Cathedrals</a>
            <a href="/dioceses">Dioceses</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a href="/exemplars">Exemplars</a>
            <a href="/solutions">Solutions</a>
            <a href="/pricing">Pricing</a>
          </div>
        </nav>
      </div>
      <div className="container" style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
        © {new Date().getFullYear()} ParishVox. A sister publication of CampusVox.
      </div>
    </footer>
  );
}

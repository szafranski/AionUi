import loginLogo from '@renderer/assets/logos/brand/app.png';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLoader from '@renderer/components/layout/AppLoader';
import { useAuth } from '../../hooks/context/AuthContext';
import './LoginPage.css';

const GoogleIcon: React.FC = () => (
  <svg width='20' height='20' viewBox='0 0 48 48' style={{ flexShrink: 0 }}>
    <path
      fill='#EA4335'
      d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.26 17.74 9.5 24 9.5z'
    />
    <path
      fill='#4285F4'
      d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
    />
    <path
      fill='#FBBC05'
      d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
    />
    <path
      fill='#34A853'
      d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-3.76-13.47-9.09l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
    />
  </svg>
);

const GitHubIcon: React.FC = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor' style={{ flexShrink: 0 }}>
    <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' />
  </svg>
);

type Step = 'welcome' | 'signin';

const LoginPage: React.FC = () => {
  const { t } = useTranslation('login');
  const { status, login } = useAuth();
  const [step, setStep] = useState<Step>('welcome');
  const [error, setError] = useState<string | null>(null);
  const didLoginRef = useRef(false);

  const features = [
    { icon: '⚡', title: t('welcome.feature1') },
    { icon: '🤖', title: t('welcome.feature2') },
    { icon: '🗂️', title: t('welcome.feature3') },
    { icon: '📱', title: t('welcome.feature4') },
  ];

  useEffect(() => {
    document.body.classList.add('login-page-active');
    return () => {
      document.body.classList.remove('login-page-active');
    };
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && didLoginRef.current) {
      window.location.hash = '/guid';
    }
  }, [status]);

  const handleSignIn = useCallback(() => {
    setError(null);
    didLoginRef.current = true;
    void login({ username: 'demo', password: 'demo', remember: false }).then((result) => {
      if (!result.success) {
        didLoginRef.current = false;
        setError(t('signin.error'));
      }
    });
  }, [login, t]);

  if (status === 'checking') return <AppLoader />;

  return (
    <div className='lp-root'>
      {/* ── Step 1: Welcome ── */}
      {step === 'welcome' && (
        <div className='lp-welcome'>
          <div className='lp-welcome-inner'>
            <div className='lp-hero'>
              <div className='lp-hero-logo'>
                <img src={loginLogo} alt='AionUi' />
              </div>
              <h1 className='lp-hero-title'>AionUi</h1>
            </div>

            <div className='lp-features'>
              {features.map((f) => (
                <div key={f.title} className='lp-feature-item'>
                  <span className='lp-feature-icon'>{f.icon}</span>
                  <div className='lp-feature-title'>{f.title}</div>
                </div>
              ))}
            </div>

            <button type='button' className='lp-btn-primary' onClick={() => setStep('signin')}>
              {t('welcome.getStarted')}
            </button>
            <p className='lp-tos-welcome'>
              {t('welcome.tos')}{' '}
              <a href='#' className='lp-tos-link'>
                {t('welcome.tosLink')}
              </a>{' '}
              {t('welcome.tosAnd')}{' '}
              <a href='#' className='lp-tos-link'>
                {t('welcome.privacyLink')}
              </a>
            </p>
          </div>
        </div>
      )}

      {/* ── Step 2: Sign In ── */}
      {step === 'signin' && (
        <div className='lp-signin'>
          <div className='lp-signin-card'>
            <button type='button' className='lp-back' onClick={() => setStep('welcome')}>
              {t('signin.back')}
            </button>

            <div className='lp-signin-logo' style={{ marginTop: 16 }}>
              <img src={loginLogo} alt='AionUi' />
            </div>
            <h2 className='lp-signin-title'>{t('signin.title')}</h2>
            <p className='lp-signin-sub'>{t('signin.subtitle')}</p>

            <div className='lp-signin-btns'>
              <button type='button' className='lp-oauth-btn' onClick={handleSignIn}>
                <GoogleIcon />
                <span>{t('signin.continueGoogle')}</span>
              </button>
              <button type='button' className='lp-oauth-btn' onClick={handleSignIn}>
                <GitHubIcon />
                <span>{t('signin.continueGitHub')}</span>
              </button>
            </div>

            {error && <p className='lp-error'>{error}</p>}

            <p className='lp-tos'>
              {t('signin.newUserHint')}{' '}
              <a href='#' className='lp-tos-link'>
                {t('welcome.tosLink')}
              </a>{' '}
              {t('welcome.tosAnd')}{' '}
              <a href='#' className='lp-tos-link'>
                {t('welcome.privacyLink')}
              </a>
              。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

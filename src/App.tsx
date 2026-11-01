import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  Crown,
  Gift,
  Heart,
  LockKeyhole,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react'

import Starfield from './components/Starfield'
import { CONFIG, PUZZLES } from './config'

type Screen = 'intro' | 'game' | 'gift'

export default function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [level, setLevel] = useState(0)
  const [answer, setAnswer] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [music, setMusic] = useState(false)
  const [opened, setOpened] = useState(false)
  const [activeTab, setActiveTab] = useState<'letter' | 'memories'>('letter')

  const puzzle = PUZZLES[level]

  const progress = useMemo(
    () =>
      screen === 'gift'
        ? 100
        : screen === 'game'
          ? (level / 3) * 100
          : 0,
    [screen, level]
  )

  function checkAnswer() {
    if (answer.trim() === puzzle.answer) {
      setWrong(false)
      setUnlocked(true)
    } else {
      setWrong(true)
      setUnlocked(false)
    }
  }

  function next() {
    if (level < PUZZLES.length - 1) {
      setLevel(v => v + 1)
      setAnswer('')
      setUnlocked(false)
      setWrong(false)
    } else {
      setScreen('gift')
      setOpened(false)
    }
  }

  function reset() {
    setScreen('intro')
    setLevel(0)
    setAnswer('')
    setUnlocked(false)
    setWrong(false)
    setOpened(false)
  }

  return (
    <main className="app-shell">
      <Starfield />

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="topbar">
        <div className="brand">
          <span className="brand-mark">V</span>
          <span>
            VANTA<span className="brand-dot">.</span>
          </span>
        </div>

        <div className="top-actions">
          <span className="edition">A PRIVATE EXPERIENCE</span>

          <button
            className="icon-button"
            onClick={() => setMusic(v => !v)}
            aria-label="Toggle sound"
          >
            {music ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
        </div>
      </nav>

      <div className="content">
        <div className="progress-wrap">
          <div className="progress-meta">
            <span>رحلة المفاجأة</span>
            <span>{Math.round(progress)}% مكتمل</span>
          </div>

          <div className="progress-track">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">

          {screen === 'intro' && (
            <motion.section
              key="intro"
              className="panel intro-panel"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
            >
              <div className="overline">
                <span className="tiny-star">✦</span>
                A SECRET IS WAITING
                <span className="tiny-star">✦</span>
              </div>

              <div className="intro-emblem">
                <div className="emblem-ring">
                  <Crown size={34} strokeWidth={1.15} />
                </div>
                <span className="emblem-spark">✧</span>
              </div>

              <p className="recipient-line">
                صُمّمت خصيصاً لـ <b>{CONFIG.recipient}</b>
              </p>

              <h1>
                كل حكاية زوينة
                <br />
                <em>كتبدأ بسرّ.</em>
              </h1>

              <p className="lead">
                وراء هاد الباب كاينة مفاجأة صغيرة…
                ولكن الوصول ليها محتاج شوية ذكاء،
                تركيز، وفضول.
              </p>

              <div className="intro-rule">
                <span />
                <LockKeyhole size={13} />
                <span />
              </div>

              <button
                className="gold-button"
                onClick={() => setScreen('game')}
              >
                ابدئي المهمة <ArrowLeft size={17} />
              </button>

              <div className="micro-copy">
                3 تحديات · سر واحد · هدية من القلب
              </div>
            </motion.section>
          )}

          {screen === 'game' && (
            <motion.section
              key="game"
              className="panel game-panel"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
            >
              <div className="game-top">
                <span className="level-tag">{puzzle.label}</span>
                <span className="level-count">
                  0{level + 1} <i>/</i> 03
                </span>
              </div>

              <div className="game-icon">
                <Sparkles size={25} />
              </div>

              <h2>{puzzle.title}</h2>

              <p className="lead">{puzzle.prompt}</p>

              <div className="equation-box">
                <span>{puzzle.expression}</span>
              </div>

              <label className="answer-label" htmlFor="answer">
                الجواب ديالك
              </label>

              <input
                id="answer"
                className="answer-input"
                inputMode="numeric"
                pattern="[0-9]*"
                value={answer}
                onChange={e => {
                  setAnswer(e.target.value)
                  setWrong(false)
                }}
                onKeyDown={e =>
                  e.key === 'Enter' &&
                  (unlocked ? next() : checkAnswer())
                }
                placeholder="؟"
              />

              {wrong && (
                <p className="feedback error">
                  ماشي هادي… خدي وقتك وحاولي مرة أخرى.
                </p>
              )}

              {unlocked && (
                <p className="feedback success">
                  <Check size={16} />
                  شفرة صحيحة! الباب بدا كيتحلّ.
                </p>
              )}

              {!unlocked && (
                <button
                  className="gold-button full"
                  onClick={checkAnswer}
                >
                  تحقّقي من الجواب <ArrowLeft size={17} />
                </button>
              )}

              {unlocked && (
                <button
                  className="gold-button full"
                  onClick={next}
                >
                  {level === 2 ? 'اكشفي المفاجأة' : 'التحدي التالي'}
                  <ArrowLeft size={17} />
                </button>
              )}

              <button
                className="hint-button"
                onClick={() => alert(`تلميح: ${puzzle.hint}`)}
              >
                <Sparkles size={14} />
                محتاجة تلميح؟
              </button>
            </motion.section>
          )}

          {screen === 'gift' && (
            <motion.section
              key="gift"
              className="panel gift-panel"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="overline">
                <span className="tiny-star">✦</span>
                ACCESS GRANTED
                <span className="tiny-star">✦</span>
              </div>

              <div
                className={`gift-scene ${opened ? 'is-open' : ''}`}
                onClick={() => setOpened(true)}
                role="button"
                tabIndex={0}
                onKeyDown={e =>
                  e.key === 'Enter' && setOpened(true)
                }
              >
                <div className="gift-glow" />

                <div className="gift-box">
                  <div className="gift-lid">
                    <span className="ribbon-bow">✧</span>
                  </div>

                  <div className="gift-body">
                    <span className="gift-ribbon" />
                  </div>
                </div>

                <span className="gift-spark spark-a">✦</span>
                <span className="gift-spark spark-b">✧</span>
                <span className="gift-spark spark-c">✦</span>
              </div>

              {!opened ? (
                <>
                  <h2 className="gift-heading">
                    الهدية ديالك كتسناك
                  </h2>

                  <p className="lead">
                    ثلاثة مفاتيح، وباب واحد…
                    ضغطي على الصندوق باش تفتحي المفاجأة.
                  </p>

                  <button
                    className="gold-button"
                    onClick={() => setOpened(true)}
                  >
                    افتحي الهدية <Gift size={17} />
                  </button>
                </>
              ) : (
                <div className="gift-reveal">
                  <h2 className="gift-heading">
                    {CONFIG.birthdayTitle} <span>♡</span>
                  </h2>

                  <div className="tabs">
                    <button
                      className={activeTab === 'letter' ? 'active' : ''}
                      onClick={() => setActiveTab('letter')}
                    >
                      <Heart size={14} /> رسالة
                    </button>

                    <button
                      className={activeTab === 'memories' ? 'active' : ''}
                      onClick={() => setActiveTab('memories')}
                    >
                      <Sparkles size={14} /> ذكريات
                    </button>
                  </div>

                  {activeTab === 'letter' ? (
                    <div className="letter-card">
                      <div className="letter-top">
                        A LITTLE NOTE, FROM THE HEART
                      </div>

                      <p>{CONFIG.message}</p>

                      <div className="letter-sign">
                        {CONFIG.sender} <span>♥</span>
                      </div>
                    </div>
                  ) : (
                    <div className="memory-grid">
                      {CONFIG.memories.map((m, i) => (
                        <div className="memory-card" key={m.title}>
                          {CONFIG.photos[i] ? (
                            <img
                              src={CONFIG.photos[i]}
                              alt={m.title}
                            />
                          ) : (
                            <div className="memory-placeholder">
                              <Heart size={24} />
                              <small>
                                YOUR MEMORY {`0${i + 1}`}
                              </small>
                            </div>
                          )}

                          <b>{m.title}</b>
                          <p>{m.caption}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="closing-line">
                    أجمل الحكايات مازال ما تكتباتش… ✨
                  </p>
                </div>
              )}

              <button
                className="restart-button"
                onClick={reset}
              >
                <RotateCcw size={14} />
                عاودي المغامرة
              </button>
            </motion.section>
          )}

        </AnimatePresence>

        <footer className="footer">
          <span>MADE WITH INTENTION</span>
          <span>✦</span>
          <span>VANTA EXPERIENCE © 2026</span>
        </footer>
      </div>
    </main>
  )
}
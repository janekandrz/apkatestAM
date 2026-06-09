import { useEffect, useMemo, useState } from 'react'
import { QUESTIONS } from './questions'

const ACTIVE_KEY = 'egzamin-am-active'
const HISTORY_KEY = 'egzamin-am-history'

const emptyAnswers = () => Object.fromEntries(QUESTIONS.map(({ id }) => [id, []]))
const emptyChecked = () => Object.fromEntries(QUESTIONS.map(({ id }) => [id, false]))

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function sameAnswers(left = [], right = []) {
  return [...left].sort().join('|') === [...right].sort().join('|')
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

function answerInstruction(count) {
  if (count === 1) return 'Zaznacz jedną odpowiedź.'
  if (count > 1 && count < 5) return `Zaznacz ${count} odpowiedzi.`
  return `Zaznacz ${count} odpowiedzi.`
}

function App() {
  const saved = useMemo(() => readStorage(ACTIVE_KEY, null), [])
  const [screen, setScreen] = useState(saved ? 'quiz' : 'home')
  const [current, setCurrent] = useState(saved?.current ?? 0)
  const [answers, setAnswers] = useState(saved?.answers ?? emptyAnswers())
  const [checked, setChecked] = useState(saved?.checked ?? emptyChecked())
  const [startedAt, setStartedAt] = useState(saved?.startedAt ?? null)
  const [hasActive, setHasActive] = useState(Boolean(saved))
  const [elapsed, setElapsed] = useState(
    saved?.startedAt ? Math.floor((Date.now() - saved.startedAt) / 1000) : 0,
  )
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState(() => readStorage(HISTORY_KEY, []))

  const answeredCount = useMemo(
    () => QUESTIONS.filter(({ id }) => checked[id]).length,
    [checked],
  )

  useEffect(() => {
    if (screen !== 'quiz' || !startedAt) return undefined

    const updateTimer = () => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000))
    }
    updateTimer()
    const timer = window.setInterval(updateTimer, 1000)
    return () => window.clearInterval(timer)
  }, [screen, startedAt])

  useEffect(() => {
    if (screen !== 'quiz' || !startedAt) return
    localStorage.setItem(
      ACTIVE_KEY,
      JSON.stringify({ current, answers, checked, startedAt }),
    )
  }, [answers, checked, current, screen, startedAt])

  function startQuiz() {
    const timestamp = Date.now()
    const nextAnswers = emptyAnswers()
    const nextChecked = emptyChecked()

    setAnswers(nextAnswers)
    setChecked(nextChecked)
    setCurrent(0)
    setStartedAt(timestamp)
    setElapsed(0)
    setResult(null)
    setHasActive(true)
    setScreen('quiz')
    localStorage.setItem(
      ACTIVE_KEY,
      JSON.stringify({
        current: 0,
        answers: nextAnswers,
        checked: nextChecked,
        startedAt: timestamp,
      }),
    )
  }

  function toggleAnswer(questionId, answerId) {
    if (checked[questionId]) return

    setAnswers((previous) => {
      const selected = previous[questionId] ?? []
      const next = selected.includes(answerId)
        ? selected.filter((item) => item !== answerId)
        : [...selected, answerId]
      return { ...previous, [questionId]: next }
    })
  }

  function checkAnswer(questionId) {
    if ((answers[questionId] ?? []).length === 0) return
    setChecked((previous) => ({ ...previous, [questionId]: true }))
  }

  function finishQuiz() {
    const completedAt = Date.now()
    const details = QUESTIONS.map((question) => ({
      id: question.id,
      selected: answers[question.id] ?? [],
      correct: question.correct,
      isCorrect: sameAnswers(answers[question.id], question.correct),
    }))
    const summary = {
      id: completedAt,
      date: new Date(completedAt).toISOString(),
      score: details.filter(({ isCorrect }) => isCorrect).length,
      total: QUESTIONS.length,
      duration: Math.floor((completedAt - startedAt) / 1000),
      details,
    }
    const nextHistory = [summary, ...history].slice(0, 20)

    setResult(summary)
    setHistory(nextHistory)
    setScreen('result')
    setHasActive(false)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory))
    localStorage.removeItem(ACTIVE_KEY)
  }

  function abandonQuiz() {
    localStorage.removeItem(ACTIVE_KEY)
    setScreen('home')
    setStartedAt(null)
    setHasActive(false)
  }

  if (screen === 'home') {
    return (
      <main className="shell">
        <section className="hero">
          <span className="eyebrow">Aplikacje mobilne</span>
          <h1>Egzamin AM</h1>
          <p>
            {QUESTIONS.length} pytań z bazy AM_Bernat. Zamiast oznaczeń A-D
            wybierasz bezpośrednio pełną treść odpowiedzi.
          </p>
          <div className="hero-actions">
            <button className="primary large" onClick={startQuiz}>
              {hasActive ? 'Zacznij od nowa' : 'Rozpocznij test'}
            </button>
            {hasActive && (
              <button className="secondary large" onClick={() => setScreen('quiz')}>
                Kontynuuj zapisany test
              </button>
            )}
          </div>
        </section>

        <section className="history">
          <div className="section-heading">
            <h2>Historia wyników</h2>
            {history.length > 0 && (
              <button
                className="text-button"
                onClick={() => {
                  setHistory([])
                  localStorage.removeItem(HISTORY_KEY)
                }}
              >
                Wyczyść
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="empty">Brak ukończonych podejść.</p>
          ) : (
            <div className="history-list">
              {history.map((attempt) => (
                <article className="attempt" key={attempt.id}>
                  <strong>{attempt.score}/{attempt.total}</strong>
                  <span>{Math.round((attempt.score / attempt.total) * 100)}%</span>
                  <span>{formatDuration(attempt.duration)}</span>
                  <time>{new Date(attempt.date).toLocaleString('pl-PL')}</time>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    )
  }

  if (screen === 'result' && result) {
    return (
      <main className="shell">
        <section className="result-card">
          <span className="eyebrow">Test zakończony</span>
          <div className="score">
            {result.score}<small>/{result.total}</small>
          </div>
          <h1>{Math.round((result.score / result.total) * 100)}%</h1>
          <p>Czas: {formatDuration(result.duration)}</p>
          <div className="result-actions">
            <button className="primary" onClick={startQuiz}>Spróbuj ponownie</button>
            <button className="secondary" onClick={() => setScreen('home')}>Strona główna</button>
          </div>
        </section>

        <section className="review">
          <h2>Podsumowanie odpowiedzi</h2>
          <div className="review-grid">
            {result.details.map((item) => (
              <button
                className={`review-item ${item.isCorrect ? 'correct' : 'wrong'}`}
                key={item.id}
                onClick={() => {
                  setCurrent(item.id - 1)
                  setScreen('review')
                }}
              >
                <strong>{item.id}</strong>
                <span>{item.isCorrect ? 'Poprawnie' : 'Błędnie'}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    )
  }

  const question = QUESTIONS[current]
  const selected = answers[question.id] ?? []
  const isReview = screen === 'review'
  const isChecked = isReview || checked[question.id]
  const isCurrentCorrect = sameAnswers(selected, question.correct)

  return (
    <main className="quiz-shell">
      <header className="topbar">
        <button
          className="brand"
          onClick={() => setScreen(result ? 'result' : 'home')}
        >
          Egzamin AM
        </button>
        <div className="topbar-stats">
          {!isReview && <span>{answeredCount}/{QUESTIONS.length} sprawdzono</span>}
          {!isReview && <span>{formatDuration(elapsed)}</span>}
          {isReview && <span>Podgląd wyniku</span>}
        </div>
      </header>

      <div className="progress" aria-label={`Pytanie ${question.id} z ${QUESTIONS.length}`}>
        <div style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }} />
      </div>

      <section className="question-card">
        <div className="question-meta">
          <span>Pytanie {question.id} z {QUESTIONS.length} · {question.source}</span>
          {isChecked && (
            <span className={isCurrentCorrect ? 'status-correct' : 'status-wrong'}>
              {isCurrentCorrect ? 'Poprawnie' : 'Błędnie'}
            </span>
          )}
        </div>

        <h1 className="question-title">{question.prompt}</h1>

        {question.media?.map((image, index) => (
          <img
            className="question-image"
            src={image}
            alt={`Materiał do pytania ${question.id}`}
            key={image}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}

        <div className={`answer-list ${question.visual ? 'visual-answer-list' : ''}`}>
          {question.choices.map((answer, index) => {
            const isSelected = selected.includes(answer.id)
            const isCorrect = isChecked && question.correct.includes(answer.id)
            const isWrong = isChecked && isSelected && !isCorrect

            return (
              <button
                key={answer.id}
                className={[
                  'answer',
                  answer.images ? 'visual-answer' : '',
                  isSelected ? 'selected' : '',
                  isCorrect ? 'answer-correct' : '',
                  isWrong ? 'answer-wrong' : '',
                ].join(' ')}
                onClick={() => toggleAnswer(question.id, answer.id)}
                disabled={isChecked}
              >
                <span className="answer-number">{index + 1}</span>
                <span className="answer-content">
                  <span className="answer-text">{answer.text}</span>
                  {answer.images && (
                    <span className="answer-images">
                      {answer.images.map((image) => (
                        <img src={image.src} alt={image.alt} key={image.src} loading="lazy" />
                      ))}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        <div className="question-feedback">
          <p className="hint">
            {isChecked
              ? isCurrentCorrect
                ? 'Dobra odpowiedź.'
                : 'Poprawne odpowiedzi zostały zaznaczone na zielono.'
              : answerInstruction(question.correct.length)}
          </p>
          {!isChecked && (
            <button
              className="check"
              onClick={() => checkAnswer(question.id)}
              disabled={selected.length === 0}
            >
              Sprawdź odpowiedź
            </button>
          )}
        </div>

        <nav className="navigation">
          <button
            className="secondary"
            onClick={() => setCurrent((value) => Math.max(0, value - 1))}
            disabled={current === 0}
          >
            Wstecz
          </button>
          {current < QUESTIONS.length - 1 ? (
            <button
              className="primary"
              onClick={() => setCurrent((value) => value + 1)}
              disabled={!isReview && !checked[question.id]}
            >
              Dalej
            </button>
          ) : isReview ? (
            <button className="primary" onClick={() => setScreen('result')}>
              Wróć do wyniku
            </button>
          ) : (
            <button
              className="finish"
              onClick={finishQuiz}
              disabled={!checked[question.id]}
            >
              Zakończ test
            </button>
          )}
        </nav>
      </section>

      {!isReview && (
        <div className="quiz-footer">
          <button className="text-button danger" onClick={abandonQuiz}>Przerwij test</button>
          <div className="question-dots">
            {QUESTIONS.map(({ id }, index) => (
              <button
                key={id}
                className={[
                  index === current ? 'active' : '',
                  checked[id] ? 'answered' : '',
                  checked[id] && sameAnswers(answers[id], QUESTIONS[index].correct)
                    ? 'dot-correct'
                    : '',
                  checked[id] && !sameAnswers(answers[id], QUESTIONS[index].correct)
                    ? 'dot-wrong'
                    : '',
                ].join(' ')}
                onClick={() => setCurrent(index)}
                aria-label={`Przejdź do pytania ${id}`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

export default App

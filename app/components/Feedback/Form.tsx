import {useState} from 'react'
import Button from '~/components/Button'
import useOutsideOnClick from '~/hooks/useOnOutsideClick'
import './feedback.css'
import {XLarge} from '../icons-generated'

export type FeedbackFormProps = {
  onSubmit?: (msg: string, option?: string) => Promise<any>
  onClose?: () => void
  className?: string
  options?: string[]
}
const FeedbackForm = ({onSubmit, onClose, options, className}: FeedbackFormProps) => {
  const [selected, setSelected] = useState<string>()
  const [message, setMessage] = useState('')
  const [enabledSubmit, setEnabledSubmit] = useState(!options)
  const clickCheckerRef = useOutsideOnClick(onClose)

  const selectFeedback = (option: string) => {
    setSelected(option)
    setEnabledSubmit(true)
  }

  const handleSubmit = async () => {
    onSubmit && (await onSubmit(message, selected))
    onClose && onClose()
  }

  return (
    <div ref={clickCheckerRef} className={'feedback-form bordered ' + (className ?? '')}>
      <button onClick={onClose} className="mobile-only escape-feedback">
        <XLarge />
      </button>
      <span className="black small padding-bottom-32">What was the problem?</span>
      {options?.map((option) => (
        <Button
          key={option}
          className={[
            option == selected ? 'secondary-alt selected' : 'secondary',
            'select-option',
          ].join(' ')}
          action={() => selectFeedback(option)}
        >
          {option}
        </Button>
      ))}

      <textarea
        name="feedback-text"
        className={['feedback-text small bordered', !options ? 'no-options' : ''].join(' ')}
        placeholder="Leave a comment (optional)"
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button className="primary full-width submit" action={handleSubmit} disabled={!enabledSubmit}>
        <p>Submit feedback</p>
      </Button>
    </div>
  )
}

export default FeedbackForm

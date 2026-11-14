import { useState } from 'react'

type AuthFieldProps = {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  autoComplete?: string
}

export function AuthField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
}: AuthFieldProps) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {isPassword && (
          <button
            type="button"
            className="visibility-toggle"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}

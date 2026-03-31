interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="glass-card flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="text-6xl">⚠️</div>
      <h3 className="mt-4 text-2xl font-black text-red-400">Kļūda</h3>
      <p className="mt-3 max-w-md text-sm text-gray-300 sm:text-base">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary mt-6">
          🔄 Mēģināt vēlreiz
        </button>
      )}
    </div>
  );
}

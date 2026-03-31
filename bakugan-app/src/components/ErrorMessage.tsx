interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-bold font-display text-red-400 mb-2">Kļūda!</h3>
      <p className="text-gray-400 font-body text-center max-w-md mb-6">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          🔄 Mēģināt vēlreiz
        </button>
      )}
    </div>
  );
}

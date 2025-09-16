interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center p-8 text-red-600">
        <p>Error: {error}</p>
      </div>
    </main>
  );
}

interface PageHeaderProps {
  className?: string;
}

export function PageHeader({ className = '' }: PageHeaderProps) {
  return (
    <header className={`px-6 py-6 ${className}`}>
      <h1>
        <img
          src="/images/Logo_prebot.png"
          alt="Prebot"
          width={2172}
          height={724}
          className="block h-auto w-[170px] max-w-full object-contain"
        />
      </h1>
    </header>
  );
}

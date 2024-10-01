import { PlusIcon } from "@heroicons/react/20/solid";

interface emptyStateProps {
    icon: any;
    title: string;
    text: string;
    buttonText: string;
}

export default function EmptyState({ icon, title, text, buttonText }: emptyStateProps) {
  return (
    <div className="text-center pt-7">
      {icon}
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{text}</p>
      <div className="mt-6 pb-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
          {buttonText}
        </button>
      </div>
    </div>
  );
}

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Erreur applicative interceptée :", error, info);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-24 dark:bg-gray-950">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-heading text-3xl font-bold text-dbsDark dark:text-white md:text-4xl">
              Une erreur est survenue
            </h1>

            <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
              Quelque chose s'est mal passé lors de l'affichage de cette
              page. Essayez de la recharger ou revenez à l'accueil.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-full bg-dbsOrange px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
              >
                Recharger la page
              </button>

              <a
                href="/"
                className="rounded-full border border-gray-200 px-8 py-4 font-semibold text-dbsDark transition hover:border-dbsOrange hover:text-dbsOrange dark:border-gray-700 dark:text-white"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

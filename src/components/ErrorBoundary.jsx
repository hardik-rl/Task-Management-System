'use client';

import { Component } from 'react';
import { toast } from 'react-toastify';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Caught in client ErrorBoundary:', error, info);
    toast.error(error.message || 'Something went wrong.');
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex items-center justify-center bg-red-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600">Client Error</h1>
            <p className="mt-2 text-gray-700">{this.state.error?.message}</p>
            <button
              onClick={this.handleReset}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

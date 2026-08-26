import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    message: "",
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error?.message || "Đã xảy ra lỗi hiển thị.",
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("APP_RENDER_ERROR:", error, info);
  }

  handleReset = () => {
    try {
      localStorage.removeItem("khbd_hoa_hoc_draft");
    } catch {
      // ignore
    }
    this.setState({ hasError: false, message: "" });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 bg-slate-50">
          <div className="max-w-lg w-full bg-white border border-red-200 rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-red-900 mb-1">
              Không thể hiển thị Kế hoạch bài dạy
            </h3>
            <p className="text-xs text-slate-600 mb-4 break-words">
              {this.state.message}
            </p>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => this.setState({ hasError: false, message: "" })}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Thử lại
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Xóa bản nháp & Tải lại
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

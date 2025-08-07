import { useEffect } from 'react';
  import { BrowserRouter, Route, Routes } from 'react-router-dom';

  // Sayfa Bileşenleri
  import { MainLayout } from './components/MainLayout';
  import { AiNotificationSystemPage } from './pages/AiNotificationSystemPage';
  import { NpmSchedulePage } from './pages/NpmSchedulePage';
  import { FormatterPage } from './pages/FormatterPage';
  import { CommentSwiperPage } from './pages/CommentSwiperPage';
  import { RegexLibraryPage } from './pages/RegexLibraryPage';
  import { RegexDebuggerPage } from './pages/RegexDebuggerPage';
  import { RegexVisualizerPage } from './pages/RegexVisualizerPage';
  import { ToDoPage } from './pages/ToDoPage';
  import { PomodoroPage } from './pages/PomodoroPage';
  import { WelcomePage } from './pages/WelcomePage';

  function App() {
    useEffect(() => {
      const handleEvents = (event: MouseEvent | KeyboardEvent) => {
        // 1. Sağ tık menüsünü engelleme
        if (event.type === 'contextmenu') {
          event.preventDefault();
          return;
        }

        // event tipini MouseEvent olarak daraltma
        if (event.type === 'click' && event instanceof MouseEvent) {
          // 2. Yeni sekme/pencere açma kısayollarını engelleme
          const isNewTabShortcut = (event.ctrlKey || event.metaKey);
          if (isNewTabShortcut) {
            event.preventDefault();
            console.log("Yeni sekme/pencere açma engellendi!");
          }
        }

        // event tipini KeyboardEvent olarak daraltma
        if (event.type === 'keydown' && event instanceof KeyboardEvent) {
          // 3. Sayfa yenileme kısayollarını engelleme
          const isRefresh = (
            event.key === 'F5' ||
            (event.key.toLowerCase() === 'r' && (event.ctrlKey || event.metaKey))
          );
          const isHardRefresh = (
            event.key.toLowerCase() === 'r' && (event.ctrlKey || event.metaKey) && event.shiftKey
          );

          if (isRefresh || isHardRefresh) {
            event.preventDefault();
            console.log("Yenileme kısayolu engellendi!");
          }
        }
      };

      // Tüm olay dinleyicilerini tek bir fonksiyon ile ekleme
      document.addEventListener('contextmenu', handleEvents);
      document.addEventListener('click', handleEvents);
      document.addEventListener('keydown', handleEvents);

      // Komponent kaldırıldığında olay dinleyicilerini temizleme
      return () => {
        document.removeEventListener('contextmenu', handleEvents);
        document.removeEventListener('click', handleEvents);
        document.removeEventListener('keydown', handleEvents);
      };
    }, []);

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<WelcomePage />} />
            <Route path="ai-notification-system" element={<AiNotificationSystemPage />} />
            <Route path="npm-schedule" element={<NpmSchedulePage />} />
            <Route path="formatter" element={<FormatterPage />} />
            <Route path="comment-swiper" element={<CommentSwiperPage />} />
            <Route path="regex-library" element={<RegexLibraryPage />} />
            <Route path="regex-debugger" element={<RegexDebuggerPage />} />
            <Route path="regex-visualizer" element={<RegexVisualizerPage />} />
            <Route path="todo" element={<ToDoPage />} />
            <Route path="pomodoro" element={<PomodoroPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      #[cfg(debug_assertions)]
      {
        let _main_window = app.get_webview_window("main").unwrap();
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
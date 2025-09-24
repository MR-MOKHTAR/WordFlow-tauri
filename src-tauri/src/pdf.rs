use std::thread::sleep;
use std::time::Duration;
use tauri::{AppHandle, Manager, WebviewWindow};

#[tauri::command]
pub async fn export_to_pdf(
    app: AppHandle,
    html: String,
    file_name: String,
) -> Result<String, String> {
    // گرفتن پنجره مخفی (pdf_window)
    let window: WebviewWindow = app
        .get_webview_window("pdf_window")
        .ok_or("pdf_window not found".to_string())?;

    // تنظیم عنوان پنجره → پیشنهاد میشه به‌عنوان اسم فایل PDF
    window
        .eval(&format!(
            "document.title = `{}`;",
            file_name.replace('`', "\\`")
        ))
        .map_err(|e| e.to_string())?;

    // تزریق HTML داخل پنجره مخفی
    window
        .eval(&format!(
            "document.body.innerHTML = `{}`;",
            html.replace('`', "\\`")
        ))
        .map_err(|e| e.to_string())?;

    // کمی صبر برای رندر شدن DOM
    sleep(Duration::from_millis(500));

    // باز کردن دیالوگ پرینت مرورگر داخلی (کاربر خودش باید Save as PDF بزنه)
    window.eval("window.print();").map_err(|e| e.to_string())?;

    Ok("Print dialog opened".to_string())
}

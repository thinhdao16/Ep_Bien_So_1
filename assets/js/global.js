/**
 * Cập nhật số view bằng cách gửi key (lấy từ tên file hiện tại) lên server.
 * Nếu filename có dạng như "trang-chu.html0456", thì sẽ cắt hết từ ".html" về sau.
 */
function updateViewPageCount() {
    const element = document.getElementById('total_view_detail');
    if (!element) {
        console.log('Không tìm thấy phần tử có id là total_view_detail.');
        return;
    }
    element.textContent = '';

    // Lấy tên file hiện tại từ URL (ví dụ: "trang-chu.html0456")
    const pathName = window.location.pathname;
    const filename = pathName.substring(pathName.lastIndexOf('/') + 1);
    
    // Tìm vị trí xuất hiện ".html" trong filename
    const htmlIndex = filename.indexOf('.html');
    let key;
    if (htmlIndex === -1) {
      // Nếu không tìm thấy ".html", sử dụng toàn bộ filename làm key
      console.log('Filename không chứa ".html", sử dụng toàn bộ filename làm key');
      key = filename;
    } else {
      // Nếu tìm thấy ".html", cắt phần key trước ".html"
      key = filename.slice(0, htmlIndex);
    }
    
    // Gửi key lên server để cập nhật view (server sẽ tự xử lý việc tăng số view)
    fetch('https://sv-ep-bien-so.vercel.app/api/update_view', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page: key })
    })
    .then(response => response.json().then(data => {
        console.log('Dữ liệu JSON nhận được từ server:', data);
        if (data && data.data != null) {
            element.textContent = data.data.view; // Cập nhật số view vào phần tử
        } else {
            console.error('Không có dữ liệu cho key:', key);
        }
    }))
    .catch(err => {
        console.error('Lỗi cập nhật view_page.json:', err);
    });
}

// Gọi hàm khi tìm thấy phần tử id "total_view_detail"
updateViewPageCount();
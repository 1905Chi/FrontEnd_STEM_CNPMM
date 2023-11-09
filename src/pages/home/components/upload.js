const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("mediaFiles", file);

  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhMmJlYmIwNS02ZjdmLTQ4ZDgtOWMyNi0xYjNlZjJlNzViNjAiLCJpYXQiOjE2OTk1MDg2NDEsImV4cCI6MTY5OTUxMjI0MX0.0IGEaOdAtvlwc7-OqBUlvX0WHp-rfZsyJ9RVu6BYPZ8Wzf50BkDIDeG2IUBUxDyCu1tbF6jYhv36lLL3D4MwuA'
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const res = await fetch('http://localhost:8080/api/v1/files/posts', {
    method: 'POST',
    body: formData,
    headers,
  });

  if (res.status === 200) {
    const data = await res.json();
    console.log(data);
    const url = data[0].refUrl;
    return url;
  } else {
    // Xử lý lỗi ở đây nếu cần.
    throw new Error('Failed to upload file');
  }
};

export default uploadToCloudinary;

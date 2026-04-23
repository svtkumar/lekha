/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["pdfkit", "pdf-lib", "docx", "exceljs", "mammoth"],
};

module.exports = nextConfig;

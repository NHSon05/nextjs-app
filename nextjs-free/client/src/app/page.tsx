import Link from 'next/link'
import { cookies } from 'next/headers'
import { 
  ArrowRight, 
  BookOpen, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Star, 
  Users, 
  Award, 
  Sparkles, 
  Clock, 
  Code2, 
} from 'lucide-react'

export default async function Home() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const isLoggedIn = !!sessionToken?.value

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden border-b border-border/20">
        {/* Decorative ambient background */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none dark:bg-teal-500/5" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none dark:bg-cyan-500/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02] dark:opacity-[0.1] pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left content column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                <span>Nền tảng học Next.js thế hệ mới</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Làm chủ <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-300">Next.js 14+</span> qua dự án thực tế
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
                Xây dựng ứng dụng hoàn chỉnh từ con số 0. Học sâu về React Server Components, Server Actions, Caching nâng cao và các nguyên tắc bảo mật chuẩn doanh nghiệp.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                {isLoggedIn ? (
                  <Link href="/me" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md shadow-teal-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
                    Vào phòng học của tôi
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <Link href="/register" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md shadow-teal-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
                    Bắt đầu học miễn phí
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                )}
                <Link href="#courses" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl border-2 border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold transition-all duration-200 cursor-pointer">
                  Xem giáo trình
                </Link>
              </div>
            </div>

            {/* Right code/mockup column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-[450px] aspect-[4/3] rounded-2xl bg-slate-900 shadow-2xl p-4 border border-slate-800 ring-1 ring-white/10 overflow-hidden">
                {/* Header bar */}
                <div className="flex items-center space-x-1.5 pb-3 border-b border-slate-800">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-500 font-mono ml-4">nextjs-free/profile.tsx</span>
                </div>
                {/* Code body */}
                <pre className="text-xs md:text-sm font-mono text-slate-300 space-y-1.5 pt-4 overflow-x-auto">
                  <code>
                    <span className="text-teal-400">import</span> {'{ useEffect }'} <span className="text-teal-400">from</span> <span className="text-orange-400">&quot;react&quot;</span>;
                    <br />
                    <br />
                    <span className="text-teal-400">export default function</span> <span className="text-yellow-400">Profile</span>() {'{'}
                    <br />
                    &nbsp;&nbsp;<span className="text-purple-400">const</span> token = <span className="text-blue-400">useAppContext</span>();
                    <br />
                    &nbsp;&nbsp;<span className="text-blue-400">useEffect</span>(() =&gt; {'{'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">fetch</span>(<span className="text-orange-400">&quot;/api/account/me&quot;</span>, {'{'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;headers: {'{'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-500">Authorization</span>: <span className="text-orange-400">`Bearer $token`</span>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{'}'});
                    <br />
                    &nbsp;&nbsp;{'}'}, [token]);
                    <br />
                    &nbsp;&nbsp;<span className="text-teal-400">return</span> &lt;<span className="text-red-400">div</span>&gt;NextDev Học Viên&lt;/<span className="text-red-400">div</span>&gt;;
                    <br />
                    {'}'}
                  </code>
                </pre>
                <div className="absolute bottom-2 right-4 flex items-center space-x-1 text-slate-500 text-[10px] font-mono">
                  <Code2 className="h-3.5 w-3.5 text-teal-500" />
                  <span>React Server Component (RSC)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-teal-600 dark:bg-teal-950 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold flex items-center justify-center">
                <Users className="h-6 w-6 mr-2 text-teal-300" />
                <span>10K+</span>
              </div>
              <p className="text-xs sm:text-sm text-teal-100 font-medium">Học viên tham gia</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold flex items-center justify-center">
                <Star className="h-6 w-6 mr-2 text-yellow-400 fill-current" />
                <span>4.9/5</span>
              </div>
              <p className="text-xs sm:text-sm text-teal-100 font-medium">Đánh giá trung bình</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold flex items-center justify-center">
                <Award className="h-6 w-6 mr-2 text-teal-300" />
                <span>5+</span>
              </div>
              <p className="text-xs sm:text-sm text-teal-100 font-medium">Dự án thực tế</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold flex items-center justify-center">
                <Clock className="h-6 w-6 mr-2 text-teal-300" />
                <span>20+ Giờ</span>
              </div>
              <p className="text-xs sm:text-sm text-teal-100 font-medium">Học liệu chuyên sâu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Tại sao bạn nên chọn NextDev?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Chương trình học hiện đại, loại bỏ lý thuyết suông. Chúng tôi tập trung 100% vào việc thực hành và giải quyết các vấn đề thực tế khi đi làm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-border/40 p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px] cursor-pointer hover:-translate-y-1">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">React Server Components (RSC)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
                  Làm chủ cơ chế kết xuất phía máy chủ tối tân của React. Giảm dung lượng bundle size gửi tới trình duyệt, tăng tốc độ load trang đầu tiên (FCP) lên 3 lần và cải thiện SEO vượt bậc.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-border/40 p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px] cursor-pointer hover:-translate-y-1">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Server Actions</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Gọi các tác vụ và mutation trực tiếp từ client mà không cần định nghĩa Router API hay Axios Controller. Tiết kiệm 40% dòng code.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-border/40 p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px] cursor-pointer hover:-translate-y-1">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Secure Authentication</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Xây dựng hệ thống đăng nhập, đăng ký bảo mật dựa trên cookie HttpOnly. Cơ chế refresh token thông minh và bảo vệ định tuyến bằng Middleware.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-border/40 p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[260px] cursor-pointer hover:-translate-y-1">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">NextJS 14 Caching & Optimizations</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl">
                  Tìm hiểu chi tiết 4 lớp Caching của Next.js (Request Memoization, Data Cache, Full Route Cache, Router Cache) và cách điều khiển revalidation cực kỳ linh hoạt.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Course list / Curriculum */}
      <section id="courses" className="py-20 lg:py-32 bg-slate-100 dark:bg-slate-900/50 scroll-mt-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Nội dung khóa học NextDev
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Giáo trình từ cơ bản đến nâng cao được cập nhật mới nhất cho Next.js 14+ (App Router).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Course Card 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border/40 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-semibold">Cơ bản</span>
                  <span className="text-xs text-slate-500 flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> 4 giờ</span>
                </div>
                <h3 className="text-lg font-bold">Tìm hiểu Kiến trúc Next.js App Router</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  Làm quen với cấu trúc thư mục, định tuyến (Routing), layouts, templates và quy trình xử lý request cơ bản.
                </p>
                <div className="border-t border-border/20 pt-4 flex items-center justify-between">
                  <span className="font-bold text-teal-600 dark:text-teal-400">Miễn phí</span>
                  <Link href="/register" className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center hover:underline">
                    Học thử <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border/40 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">Trung cấp</span>
                  <span className="text-xs text-slate-500 flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> 8 giờ</span>
                </div>
                <h3 className="text-lg font-bold">Xác thực người dùng & Bảo mật nâng cao</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  Cơ chế lưu trữ token an toàn, phân quyền Router, thiết kế API routes và sử dụng middleware để quản lý phiên đăng nhập.
                </p>
                <div className="border-t border-border/20 pt-4 flex items-center justify-between">
                  <span className="font-bold text-teal-600 dark:text-teal-400">Miễn phí</span>
                  <Link href="/register" className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center hover:underline">
                    Học thử <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border/40 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold">Nâng cao</span>
                  <span className="text-xs text-slate-500 flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> 10 giờ</span>
                </div>
                <h3 className="text-lg font-bold">Tối ưu hóa hiệu năng & Caching</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  Ứng dụng nâng cao của On-Demand Revalidation, tối ưu hóa kích thước bundle và cấu hình Next.js trong môi trường sản xuất lớn.
                </p>
                <div className="border-t border-border/20 pt-4 flex items-center justify-between">
                  <span className="font-bold text-teal-600 dark:text-teal-400">Miễn phí</span>
                  <Link href="/register" className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center hover:underline">
                    Học thử <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Đánh giá từ học viên
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Xem các lập trình viên khác nói gì về trải nghiệm học tập tại NextDev.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review 1 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-border/40 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-yellow-400 space-x-0.5">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                  &quot;Các bài học về React Server Components thực sự chi tiết và dễ hiểu hơn nhiều so với việc đọc document. Tôi đã ứng dụng thành công vào dự án của công ty ngay lập tức.&quot;
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-border/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                  AN
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Nguyễn Hoàng An</h4>
                  <p className="text-[11px] text-slate-500">Frontend Engineer tại VNG</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-border/40 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-yellow-400 space-x-0.5">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                  &quot;Hệ thống xác thực cookie và middleware ở NextDev được thiết kế rất chuyên nghiệp, bám sát các thực hành bảo mật chuẩn. Các kiến thức này cực kỳ giá trị.&quot;
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-border/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-white font-bold text-sm">
                  MT
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Trần Minh Tâm</h4>
                  <p className="text-[11px] text-slate-500">Fullstack Developer</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-border/40 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-yellow-400 space-x-0.5">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                  &quot;Từ khi hoàn thành khóa học NextDev, tôi cảm thấy tự tin hơn hẳn khi phỏng vấn tuyển dụng. Codebase NextJS giờ đây được tổ chức rất quy chuẩn.&quot;
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-border/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                  HP
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Phạm Hải Phong</h4>
                  <p className="text-[11px] text-slate-500">Sinh viên năm 4 ĐHQG</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-teal-900 via-slate-950 to-cyan-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
        
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Sẵn sàng chinh phục Next.js hôm nay?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Học tập miễn phí, nâng cấp kỹ năng, kết nối cộng đồng nhà phát triển giỏi.
          </p>
          <div className="pt-4">
            {isLoggedIn ? (
              <Link href="/me" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md shadow-teal-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
                Truy cập phòng học của bạn
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <Link href="/register" className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md shadow-teal-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
                Đăng ký ngay bây giờ
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}

# نشر Culture Quiz على Render + ربط yuri4games.live

## 1) ارفع المشروع إلى GitHub
```bash
# (تم تهيئة git وعمل أول commit محليًا)
# أنشئ مستودعًا جديدًا فارغًا على github.com (مثلاً: culture-quiz) ثم:
git remote add origin https://github.com/<حسابك>/culture-quiz.git
git branch -M main
git push -u origin main
```
> ملاحظة: `.env.local` متجاهَل ولن يُرفع — أسرارك آمنة.

## 2) أنشئ خدمة على Render
1. ادخل **render.com** → **New +** → **Web Service**
2. اربط مستودع GitHub
3. سيقرأ Render ملف `render.yaml` تلقائيًا (Plan: Free)
4. تأكد أن: Build = `npm install && npm run build` · Start = `npm start`

## 3) اضبط متغيّرات البيئة (Environment) في Render
| المفتاح | القيمة |
|--------|--------|
| `ADMIN_PASSWORD` | كلمة سر لوحة التحكم |
| `ADMIN_SECRET` | نص عشوائي طويل |
| `SUPABASE_URL` | (اختياري) رابط مشروع Supabase |
| `SUPABASE_SERVICE_KEY` | (اختياري) service_role key |
| `NODE_VERSION` | `22` (مضبوط في render.yaml) |

اضغط **Deploy** — وانتظر أول بناء.

## 4) اربط الدومين yuri4games.live
1. في Render: **Settings → Custom Domains → Add** → اكتب `yuri4games.live` (و`www.yuri4games.live` إن أردت)
2. Render سيعطيك سجلات DNS. عند مسجّل الدومين أضف:

| Type | Name | Value |
|------|------|-------|
| `A` أو `ALIAS`/`ANAME` | `@` | (القيمة من Render) |
| `CNAME` | `www` | `<your-app>.onrender.com` |

3. انتظر انتشار DNS (دقائق–ساعات). Render يصدر شهادة SSL (https) تلقائيًا.

## ملاحظات مهمة
- **الخطة المجانية تنام بعد 15 دقيقة خمول** — افتح اللوحة قبل البث بدقيقة لتستيقظ. أثناء البث تبقى نشطة (اتصال Kick يبقيها صاحية).
- **curl متوفر** في Render افتراضيًا (ضروري للاتصال بـ Kick).
- **مثيل واحد فقط** (لا تفعّل autoscaling) — الحالة في الذاكرة تتطلب خادمًا واحدًا.
- بعد النشر: لوحة التحكم على `https://yuri4games.live` · overlay الـ OBS على `https://yuri4games.live/overlay`

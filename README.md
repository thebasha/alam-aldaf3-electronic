# عالم الدفع الإلكتروني | Alam Electronic Payment

تطبيق ويب/Android تجريبي ثنائي اللغة (العربية والإنجليزية) وبالعملة IQD.

## الأقسام الموجودة
- الخدمات الرقمية: شحن الألعاب والتطبيقات والبطاقات وتعبئة الهاتف وخدمات المحافظ.
- الهواتف والإكسسوارات.
- السيارات والدراجات.
- العقارات والمنازل.

## بنية الملفات
- `index.html`: واجهة GitHub Pages.
- `www/index.html`: نسخة الويب التي يضمّنها تطبيق Capacitor على Android.
- `firestore.rules`: قواعد بيانات تمنح العميل الوصول إلى ملفه وطلباته وإعلاناته ضمن حدود الملكية.
- `storage.rules`: رفع صور موثق للحسابات، مع قيود الحجم ونوع الملف.
- `firebase.json`: إعداد Firebase CLI لنشر قواعد Firestore وStorage.
- `capacitor.config.json`: إعداد تطبيق Android.

## إعداد Firebase المطلوب قبل الاستخدام
1. أنشئ مشروع Firebase خاصاً بك من Firebase Console.
2. فعّل Authentication > Sign-in method > Email/Password.
3. أنشئ Cloud Firestore وStorage في المشروع.
4. ثبّت Firebase CLI على جهاز موثوق وسجّل الدخول: `firebase login`.
5. اربط المشروع: `firebase use --add` (لا تضع service-account key أو أي سر في المستودع).
6. انشر القواعد: `firebase deploy --only firestore:rules,storage`.
7. لنشر القواعد من الهاتف دون تثبيت CLI محلياً: أضف GitHub Actions Secret باسم `FIREBASE_SERVICE_ACCOUNT` يحتوي JSON لحساب خدمة مخصص للنشر، وأضف Repository Variable باسم `FIREBASE_PROJECT_ID` بقيمة معرّف مشروع Firebase الصحيح، ثم شغّل Actions > Deploy Firebase security rules > Run workflow. لا ترسل ملف الحساب أو مفتاحه في المحادثات ولا تضعه داخل المستودع.\n8. امنح صلاحية المدير فقط من بيئة موثوقة باستخدام Firebase Admin SDK وCustom Claims (مثل `admin: true`). لا تسمح للعميل بتعيين دوره بنفسه.

## حالة الأمان والجاهزية
- قواعد Firestore تمنع العميل من تعديل حالة الطلب أو قيمة الطلب أو هوية صاحبه؛ الإدارة الموثوقة فقط يمكنها ذلك.
- قواعد Storage تقيد رفع الصور بالمستخدم صاحب المسار وبملفات صور محددة وبحجم أقل من 5MB.
- أي مسار غير مصرح به مرفوض افتراضياً.
- **الواجهة الحالية لا تزال تستخدم تسجيل دخول محلياً تجريبياً وlocalStorage للطلبات/اللغة؛ لم يتم ربط Firebase Authentication أو Firestore داخل الواجهة بعد.**
- قواعد الأمان في هذا المستودع لا تصبح فعالة على مشروع Firebase حتى تنشرها على المشروع الصحيح.
- لا يوجد backend موثوق أو تكامل دفع حي مع زين كاش/ماستركارد/سوبر كي حتى الآن. لا تستخدم النسخة الحالية لاستقبال أموال أو بيانات بطاقات حساسة.
- لا يمكن ضمان حماية 100%. يلزم اختبار اختراق ومراجعة إعدادات Firebase وقواعدها وسياسات HTTP قبل الإطلاق.

## بناء APK
يعمل GitHub Actions تلقائياً عند الدفع إلى `main`، ويمكن تشغيله يدوياً من Actions > Build Android APK > Run workflow. بعد نجاح البناء، حمّل Artifact باسم `alam-aldaf3-electronic-debug-apk`. هذه نسخة Debug للاختبار وليست APK إصداراً موقعاً للنشر العام.

## نشر الواجهة
يمكن نشر `index.html` عبر GitHub Pages من إعدادات المستودع. تحديث GitHub لا ينشر قواعد Firebase تلقائياً؛ اتبع خطوات Firebase أعلاه.

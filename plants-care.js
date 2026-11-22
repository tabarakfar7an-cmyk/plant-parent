/* Plant Parent - per-plant symptom engine. Needs plants-more.js first. */
(function(P){
"use strict";
if(!P)return;
const c=(t,e,a)=>['c',t,e,a],s=(t,e,a)=>['s',t,e,a],p=(t,e,a)=>['p',t,e,a];

/* care groups: [tags, tip EN, tip AR] */
const G={
generic:['mid,bright,aphids,mites,mealy,rot,spot',`Water when the top 3 cm of soil are dry, give bright indirect light, and check leaf undersides for pests every week.`,`اسقِ عندما تجفّ أول 3 سم من التربة، وأعطِه ضوءًا مباشرًا غير حارق، وافحص الجهة السفلية للأوراق أسبوعيًا بحثًا عن الآفات.`],
aroid:['mid,bright,mites,mealy,scale,thrips,rot,spot,salt,humid,inp',`Aroids like evenly moist but never soggy soil, bright indirect light and warm, humid air. Their classic problems are overwatering, dry air and spider mites.`,`الأروئيات تحب تربة رطبة باعتدال دون تشبّع، وضوءًا غير مباشر ساطعًا وهواءً دافئًا رطبًا. مشاكلها المعتادة: الريّ الزائد وجفاف الهواء والعنكبوت الأحمر.`],
ficus:['mid,bright,scale,mites,mealy,drop,spot,inp',`Ficus and similar woody foliage plants hate change: keep them in one bright spot, water when the top 3-5 cm are dry and avoid draughts.`,`الفيكس والنباتات الخشبية المشابهة تكره التغيير: ثبّتها في مكان مشرق واحد، واسقِها عندما تجفّ أول 3-5 سم وتجنّب تيارات الهواء.`],
palmi:['mid,bright,mites,mealy,scale,salt,mg,k,humid,inp',`Indoor palms like even moisture, bright indirect light and rested water; they brown easily from salts, dry air and magnesium or potassium shortage.`,`النخيل الداخلي يحب رطوبة منتظمة وضوءًا غير مباشر وماءً مُرتاحًا؛ تبنّ أطرافه بسهولة من الأملاح وجفاف الهواء ونقص المغنيسيوم أو البوتاسيوم.`],
palmo:['dry,full,scale,borer,k,mg,tree,cold',`Outdoor palms want full sun, deep but infrequent watering and potassium-rich feeding. Watch the crown for pests, and avoid pruning green fronds.`,`النخيل الخارجي يريد شمسًا كاملة وريًّا عميقًا متباعدًا وتسميدًا غنيًا بالبوتاسيوم. راقب القمة بحثًا عن الآفات ولا تقصّ السعف الأخضر.`],
dracaena:['dry,bright,mites,thrips,mealy,salt,rot,inp',`Dracaenas, yuccas and agave-type plants prefer drying between waterings and are sensitive to fluoride in tap water, which browns the leaf tips.`,`الدراسينا واليوكا وما شابهها تفضّل أن تجفّ بين الريّات وتتأثر بفلورايد ماء الصنبور الذي يبنّن أطراف الأوراق.`],
hardy:['dry,shade,rot,mealy,inp',`Tough, drought-tolerant foliage plants: water only when fully dry (every 2-4 weeks) and they will tolerate low light. Overwatering is nearly the only way to lose them.`,`نباتات ورقية صلبة تتحمل الجفاف: اسقِها فقط عند الجفاف التام (كل 2-4 أسابيع) وتتحمل الضوء القليل. الريّ الزائد هو السبب الوحيد تقريبًا لخسارتها.`],
succ:['dry,full,mealy,rot,succ,scale,inp',`Succulents want gritty fast-draining soil, lots of light and a thorough soak only when the soil is completely dry; water far less in winter.`,`العصاريات تريد تربة خشنة سريعة التصريف وضوءًا وفيرًا وريًّا غزيرًا فقط عند الجفاف التام، مع تقليل الريّ كثيرًا في الشتاء.`],
cactus:['dry,full,mealy,rot,scale,succ',`Cacti need full sun, very gritty soil and very little water, almost none in winter when they rest.`,`الصبّار يحتاج شمسًا كاملة وتربة خشنة جدًا وماءً قليلًا جدًا، ويكاد لا يحتاج شيئًا في الشتاء حين يرتاح.`],
orchid:['mid,bright,scale,mealy,rot,humid,flower,orch,inp',`Orchids grow in bark, not soil: water when roots turn silvery, never leave water in the crown, and give bright indirect light with a cooler night to trigger blooms.`,`الأوركيد ينمو في لحاء لا تربة: اسقِه عندما تصبح الجذور فضية، ولا تترك ماءً في قلب النبات، وأعطِه ضوءًا ساطعًا غير مباشر وليلًا أبرد لتحفيز الإزهار.`],
bromel:['mid,bright,rot,scale,mealy,humid,inp,flower',`Bromeliads hold water in a central cup: keep the cup lightly filled, flush it often, and keep the soil only slightly moist.`,`البروميليا تخزّن الماء في كأس مركزية: أبقِ الكأس مملوءة قليلًا واشطفها كثيرًا، وأبقِ التربة رطبة قليلًا فقط.`],
maranta:['wet,shade,mites,salt,humid,inp',`Prayer plants and calatheas are fussy: constant light moisture, high humidity, no direct sun and filtered or rain water.`,`نباتات الصلاة والكالاثيا حساسة: رطوبة خفيفة مستمرة وهواء رطب وبلا شمس مباشرة وماء مفلتر أو مطر.`],
fern:['wet,shade,scale,humid,salt,inp',`Ferns want constantly damp soil, high humidity and indirect light; one dry spell can brown fronds that will not turn green again.`,`السراخس تريد تربة رطبة باستمرار ورطوبة هواء عالية وضوءًا غير مباشر؛ جفاف واحد قد يبنّن السعف بلا رجعة.`],
trail:['mid,bright,mites,mealy,rot,trail,inp',`Trailing plants like even moisture and bright light; pinch the tips often so they stay full and not bare at the base.`,`النباتات المتدلية تحب رطوبة منتظمة وضوءًا ساطعًا؛ اقرص الأطراف كثيرًا لتبقى كثيفة غير عارية من القاعدة.`],
flowin:['wet,bright,mealy,mildew,rot,flower,humid,inp',`Flowering houseplants like steady moisture, high humidity and bright indirect light; water the soil not the leaves, and feed lightly with a bloom fertiliser.`,`نباتات الزينة المزهرة تحب رطوبة ثابتة وهواءً رطبًا وضوءًا غير مباشر ساطعًا؛ اسقِ التربة لا الأوراق وسمّد بخفة بسماد للأزهار.`],
annual:['mid,full,aphids,whitefly,mites,mildew,rot,flower,n',`Bedding flowers want sun, steady moisture and light feeding; deadhead spent blooms and watch for aphids and mildew.`,`أزهار الموسم تريد شمسًا ورطوبة ثابتة وتسميدًا خفيفًا؛ أزل الأزهار الذابلة وراقب المنّ والبياض.`],
shrubfl:['mid,full,aphids,whitefly,mites,flower,iron,mildew',`Flowering shrubs want full sun, deep watering and a potassium-rich feed for blooms; prune right after the main flush.`,`الشجيرات المزهرة تريد شمسًا كاملة وريًّا عميقًا وتسميدًا غنيًا بالبوتاسيوم للإزهار؛ قلّمها بعد موجة الإزهار الرئيسية.`],
rose:['mid,full,aphids,mites,mildew,spot,rust,flower,n',`Roses want 6+ hours of sun, deep watering at the base (never the leaves), good airflow and a feed after each flush; black spot and mildew are the main enemies.`,`الورد يريد 6 ساعات شمس فأكثر وريًّا عميقًا عند القاعدة (لا على الأوراق) وتهوية جيدة وتسميدًا بعد كل موجة؛ البقعة السوداء والبياض أبرز أعدائه.`],
jasmine:['mid,full,aphids,mealy,mites,whitefly,flower,iron',`Jasmine loves sun, a trellis, regular water in the warm months and a trim right after it blooms; iron shortage yellows it in alkaline soil.`,`الياسمين يحب الشمس والدعامة والريّ المنتظم في الأشهر الدافئة وتقليمًا مباشرة بعد الإزهار؛ نقص الحديد يصفّره في التربة القلوية.`],
medherb:['dry,full,rot,mildew,aphids,spot,mites',`Mediterranean herbs want full sun, gritty lean soil and little water; they die more often from wet roots than from drought.`,`أعشاب المتوسط تريد شمسًا كاملة وتربة خشنة فقيرة وماءً قليلًا؛ تموت من الجذور المبتلة أكثر من العطش.`],
softherb:['wet,bright,aphids,whitefly,mildew,gnats,bolt,veg,n',`Soft herbs like rich, evenly moist soil, morning sun and frequent harvesting; pinch flower buds so they keep making leaves.`,`الأعشاب الطرية تحب تربة غنية رطبة باستمرار وشمس الصباح وحصادًا متكررًا؛ اقرص البراعم الزهرية لتستمر في إنتاج الأوراق.`],
allium:['mid,full,thrips,rot,rust,veg,n',`Onion-family crops want full sun, loose soil, even water until the tops fall over, then dry soil to cure the bulbs.`,`محاصيل البصل تريد شمسًا كاملة وتربة مفككة وريًّا منتظمًا حتى تسقط الأوراق، ثم تربة جافة لتجفيف الرؤوس.`],
greens:['wet,bright,aphids,miner,caterpillar,mildew,bolt,veg,n',`Leafy greens are cool-season crops: grow them in autumn to spring, keep the soil evenly moist and feed with nitrogen for lush leaves.`,`الخضروات الورقية محاصيل موسم بارد: ازرعها من الخريف حتى الربيع وأبقِ التربة رطبة بانتظام وسمّدها بالنيتروجين لأوراق وافرة.`],
brassica:['mid,full,caterpillar,aphids,whitefly,veg,n',`Cabbage-family crops are cool-season and nitrogen-hungry; protect them from cabbage worms with net, and keep watering steady.`,`الكرنبيات محاصيل موسم بارد وشرهة للنيتروجين؛ احمِها من ديدان الكرنب بشبك وحافظ على ريّ ثابت.`],
solan:['mid,full,blight,whitefly,mites,aphids,fruit,veg,ca,flower,k',`Tomato-family crops want full sun, deep regular watering, mulch to keep moisture steady, and potassium feed once fruit sets; avoid wetting leaves.`,`العائلة الباذنجانية تريد شمسًا كاملة وريًّا عميقًا منتظمًا ونشارة لتثبيت الرطوبة وتسميدًا بالبوتاسيوم عند عقد الثمار؛ تجنّب بلّ الأوراق.`],
cucurb:['mid,full,mildew,aphids,whitefly,mites,fruit,veg,flower,vine',`Squash, cucumber and melon want sun, lots of water at the roots, rich soil and good pollination; powdery mildew arrives late in the season.`,`الكوسا والخيار والشمام تريد شمسًا وماءً وفيرًا عند الجذور وتربة غنية وتلقيحًا جيدًا؛ يصل البياض الدقيقي في آخر الموسم.`],
legume:['mid,full,aphids,rust,mildew,veg,flower',`Beans, peas and pulses fix their own nitrogen, so go easy on feed; keep water steady at flowering and pick pods young.`,`البقوليات تثبّت نيتروجينها بنفسها فخفّف التسميد؛ حافظ على ريّ ثابت وقت الإزهار واقطف القرون صغيرة.`],
cereal:['mid,full,aphids,caterpillar,rust,n,veg',`Cereals and corn are heavy feeders: give nitrogen early, keep water steady at flowering and plant in blocks for wind pollination.`,`الحبوب والذرة شرهة للتسميد: أعطها نيتروجينًا مبكرًا وماءً ثابتًا وقت الإزهار وازرعها في كتل لتلقيح الريح.`],
rootveg:['mid,full,rot,miner,aphids,veg,k',`Root crops want loose, stone-free soil, even moisture and low nitrogen; heavy feeding makes leaves but small or forked roots.`,`محاصيل الجذور تريد تربة مفككة خالية من الحجارة ورطوبة منتظمة ونيتروجينًا قليلًا؛ التسميد الثقيل يعطي أوراقًا وجذورًا صغيرة أو متشعبة.`],
berry:['wet,full,mildew,mites,aphids,rot,fruit,flower,iron,chillneed',`Berries like acidic or rich soil, steady moisture and mulch; keep fruit off wet soil and pick promptly to avoid grey mould.`,`التوتيات تحب تربة حامضية أو غنية ورطوبة ثابتة ونشارة؛ أبعد الثمار عن التربة المبتلة واقطفها بسرعة لتجنّب العفن الرمادي.`],
citrus:['mid,full,iron,n,mg,scale,miner,aphids,fruit,flower,tree,cold,mealy',`Citrus wants full sun, deep watering when the top 5 cm dry, frequent light feeding with iron and magnesium, and protection from frost.`,`الحمضيات تريد شمسًا كاملة وريًّا عميقًا عند جفاف أول 5 سم وتسميدًا خفيفًا متكررًا بالحديد والمغنيسيوم وحماية من الصقيع.`],
stone:['mid,full,aphids,borer,curl,fruit,flower,tree,rot,spot,decid,chillneed',`Stone fruits need winter chill to flower, full sun, deep watering in summer and a winter spray against leaf curl and borers.`,`الفاكهة ذات النواة تحتاج برد الشتاء لتزهر وشمسًا كاملة وريًّا عميقًا صيفًا ورشًّا شتويًا ضد تجعّد الأوراق والحفّارات.`],
pome:['mid,full,scab,mildew,aphids,fruit,flower,tree,caterpillar,rust,decid,chillneed',`Apples and pears need winter chill and cross-pollination; thin the fruit, trap codling moth and keep the centre of the tree open.`,`التفاح والكمثرى يحتاجان برد الشتاء والتلقيح الخلطي؛ خفّف الثمار وصِد فراشة التفاح وأبقِ وسط الشجرة مفتوحًا.`],
medfruit:['dry,full,scale,spot,fruit,flower,tree,borer,aphids',`Mediterranean trees are built for sun and drought: deep, infrequent watering, lean soil, an open canopy and a light prune each winter.`,`أشجار المتوسط مصممة للشمس والجفاف: ريّ عميق متباعد وتربة فقيرة وتاج مفتوح وتقليم خفيف كل شتاء.`],
grape:['mid,full,mildew,fruit,vine,mites,flower,decid,chillneed',`Grapes want sun, a strong trellis, winter pruning to 2-3 buds per spur and sulfur before bloom against powdery mildew.`,`العنب يريد شمسًا وعريشة قوية وتقليمًا شتويًا إلى 2-3 براعم في كل فرع وكبريتًا قبل الإزهار ضد البياض الدقيقي.`],
tropfruit:['mid,full,cold,mealy,scale,fruit,flower,tree,iron,mites',`Tropical and subtropical fruit trees hate frost, want regular water and monthly feeding in warm months and wind shelter.`,`أشجار الفاكهة الاستوائية تكره الصقيع وتريد ريًّا منتظمًا وتسميدًا شهريًا في الأشهر الدافئة وحماية من الريح.`],
conifer:['dry,full,mites,borer,rot,tree,scale',`Conifers want sun, free-draining soil and deep watering once established; browning from the inside is often normal ageing, but browning at the tips means dry roots or mites.`,`الصنوبريات تريد شمسًا وتربة جيدة التصريف وريًّا عميقًا بعد التثبيت؛ البنّي من الداخل غالبًا تشيخ طبيعي، أما بنّي الأطراف فيعني جفاف الجذور أو العنكبوت.`],
tree:['mid,full,aphids,scale,borer,mildew,tree,iron',`Water young trees deeply once a week in summer and mulch the root zone (not touching the trunk); established trees need far less.`,`اسقِ الأشجار الصغيرة بعمق مرة أسبوعيًا صيفًا وضع نشارة حول الجذور (دون ملامسة الجذع)؛ الأشجار الراسخة تحتاج أقل بكثير.`],
bulb:['mid,full,rot,flower,bulb,aphids,chillneed',`Bulbs need drainage above all, water while leaves are green, and a rest: let leaves yellow naturally to refill the bulb for next year.`,`البصيلات تحتاج تصريفًا قبل كل شيء وريًّا ما دامت الأوراق خضراء وفترة راحة: اترك الأوراق تصفرّ طبيعيًا لتملأ البصلة لموسم قادم.`],
aquatic:['wet,full,aphids,flower,rot',`Aquatic plants need still, warm water, full sun and regular feeding with aquatic fertiliser tabs; trim dead leaves to keep the water clean.`,`النباتات المائية تحتاج ماءً راكدًا دافئًا وشمسًا كاملة وتسميدًا منتظمًا بأقراص خاصة؛ اقطع الأوراق الميتة للحفاظ على نظافة الماء.`]
};

/* symptoms: [key, severity 0-2, EN, AR, shown for tags] */
const SY=[
['yellow',1,'Yellowing leaves','اصفرار الأوراق','*'],
['browntips',0,'Brown tips or edges','أطراف أو حواف بنية','*'],
['spots',1,'Dark or pale spots','بقع داكنة أو شاحبة','*'],
['powder',1,'White powder or fluff','مسحوق أو زغب أبيض','*'],
['droop',1,'Drooping or wilting','ذبول وتدلّي','*'],
['curl',0,'Curling or twisted leaves','التفاف الأوراق','*'],
['pests',1,'Insects seen','حشرات ظاهرة','*'],
['sticky',1,'Sticky film or black soot','مادة لزجة أو سخام أسود','*'],
['leggy',0,'Leggy, pale or stretched growth','نمو طويل باهت','inp|bolt|succ|trail|veg|flower'],
['mushy',2,'Mushy base or bad smell','قاعدة طرية أو رائحة','*'],
['dropleaves',1,'Leaves or buds dropping','تساقط الأوراق أو البراعم','*'],
['bleached',1,'Bleached or scorched patches','بقع محروقة أو مبيّضة','*'],
['holes',0,'Holes or chewed edges','ثقوب أو حواف مقضومة','*'],
['noflower',0,'No flowers or fruit','لا أزهار أو ثمار','flower|fruit'],
['fruit',1,'Fruit rotting, cracking or falling','ثمار تتعفن أو تتشقق أو تسقط','fruit'],
['stunted',0,'Slow or stunted growth','نمو بطيء أو متوقف','*'],
['redpurple',0,'Red or purple leaves','أوراق حمراء أو بنفسجية','*']
];

/* tagged fragments: c = cause (likelier first), s = step, p = prevention */
const FR={
yellow:[
c('autumn',`Autumn yellowing is natural for this deciduous plant as days shorten and nights cool.`,`اصفرار الخريف طبيعي لهذا النبات المتساقط الأوراق مع قِصَر النهار وبرودة الليل.`),
c('iron',`Iron shortage (chlorosis): young leaves turn yellow while the veins stay green. Alkaline soil and hard tap water lock iron up.`,`نقص الحديد (الكلوروزيس): تصفرّ الأوراق الصغيرة وتبقى العروق خضراء. التربة القلوية وماء الصنبور العسر يحبسان الحديد.`),
c('k',`Potassium shortage: older fronds turn yellow then orange-brown from the tips, typical of palms in poor soil.`,`نقص البوتاسيوم: يصفرّ السعف القديم ثم يتحول إلى برتقالي بني من الأطراف، وهو شائع في النخيل بالتربة الفقيرة.`),
c('dry',`Overwatering is the top suspect: this plant wants to dry out between waterings, and wet soil suffocates its roots.`,`الريّ الزائد هو المشتبه الأول: هذا النبات يحب أن تجفّ تربته بين الريّات، والتربة المبتلة تخنق جذوره.`),
c('mid',`Uneven watering: long dry spells followed by soaking stress the roots, and older leaves yellow first.`,`ريّ غير منتظم: فترات جفاف طويلة تتبعها غمرة تجهد الجذور وتصفرّ الأوراق القديمة أولًا.`),
c('wet',`It dried out too much: this plant likes constantly damp soil, and yellowing with crisp edges means thirst.`,`جفّ أكثر من اللازم: هذا النبات يحب تربة رطبة باستمرار، والاصفرار مع حواف يابسة يعني العطش.`),
c('mg',`Magnesium shortage: older leaves yellow between the veins while the veins stay green.`,`نقص المغنيسيوم: تصفرّ الأوراق القديمة بين العروق وتبقى العروق خضراء.`),
c('n',`Nitrogen hunger: the oldest leaves fade to an even pale yellow and growth slows.`,`جوع النيتروجين: تبهت الأوراق الأقدم إلى أصفر باهت متجانس ويتباطأ النمو.`),
c('full|bright',`Too little light: leaves lose chlorophyll and fade to pale yellow.`,`ضوء قليل: تفقد الأوراق الكلوروفيل وتبهت إلى الأصفر.`),
c('chill',`Cold stress: nights below 8°C make tender leaves yellow quickly.`,`إجهاد البرد: الليالي تحت 8°م تصفّر الأوراق الغضة بسرعة.`),
c('rot',`Root rot: yellowing together with a sour smell or black, mushy roots under the soil.`,`تعفّن الجذور: اصفرار مع رائحة حامضة أو جذور سوداء طرية تحت التربة.`),
c('*',`Normal ageing: one or two old lower leaves yellowing now and then is fine.`,`تشيخ طبيعي: اصفرار ورقة أو ورقتين سفليتين قديمتين من حين لآخر أمر عادي.`),
s('autumn',`Nothing to treat: reduce watering, stop feeding and mulch the base.`,`لا حاجة للعلاج: قلّل الريّ وأوقف التسميد وضع نشارة عند القاعدة.`),
s('iron',`Apply chelated iron (Fe-EDDHA) as a soil drench, since it works in alkaline soil; use rainwater or rested water when you can.`,`أضف الحديد المخلّبي (Fe-EDDHA) مع ماء الريّ لأنه يعمل في التربة القلوية؛ واستخدم ماء المطر أو ماءً مُرتاحًا إن أمكن.`),
s('k',`Feed with a potassium-rich palm fertiliser (with magnesium) in spring and summer.`,`سمّد بسماد نخيل غني بالبوتاسيوم (مع المغنيسيوم) في الربيع والصيف.`),
s('dry',`Let the soil dry fully (at least the top 5 cm) before watering again and empty the saucer.`,`اترك التربة تجفّ تمامًا (أول 5 سم على الأقل) قبل الريّ التالي وأفرغ الصحن.`),
s('mid',`Water deeply when the top 3 cm are dry, then let the excess drain; avoid little-and-often sips.`,`اسقِ بعمق عندما تجفّ أول 3 سم ثم اترك الزائد يصرّف؛ وتجنّب الريّ القليل المتكرر.`),
s('wet',`Water as soon as the top 1-2 cm dries and never let the pot go bone dry.`,`اسقِ بمجرد جفاف أول 1-2 سم ولا تدع الأصيص يجفّ تمامًا.`),
s('mg',`Dissolve 1 teaspoon of Epsom salt in a litre of water and water the soil once a month for 2-3 months.`,`أذب ملعقة صغيرة من ملح إبسوم في لتر ماء واسقِ التربة به مرة شهريًا لمدة 2-3 أشهر.`),
s('n',`Feed with a balanced fertiliser at half strength every 2-3 weeks in the growing season.`,`سمّد بسماد متوازن بنصف التركيز كل 2-3 أسابيع في موسم النمو.`),
s('full|bright',`Move it closer to a bright window with indirect light, or add a grow light.`,`انقله قرب نافذة مشرقة بضوء غير مباشر أو أضف إضاءة نمو.`),
s('rot',`Slide the plant out, cut away black or mushy roots and repot in fresh, airy mix with drainage holes.`,`أخرج النبات وقصّ الجذور السوداء أو الطرية وأعد زراعته في تربة جديدة مهوّاة بأصيص مثقوب.`),
s('chill',`Keep it away from cold windows and draughts; cover or bring in tender outdoor plants at night.`,`أبعده عن النوافذ الباردة والتيارات؛ وغطِّ النباتات الخارجية الحساسة أو أدخلها ليلًا.`),
s('*',`Snip fully yellow leaves at the base with clean scissors.`,`قصّ الأوراق الصفراء تمامًا من القاعدة بمقص نظيف.`),
p('*',`Check the soil with a finger before every watering instead of following the calendar.`,`افحص التربة بإصبعك قبل كل ريّ بدل الاعتماد على التقويم.`)
],
browntips:[
c('humid|dryair',`Dry air is the usual culprit: heaters, air conditioners and desert wind pull moisture from the leaf tips first.`,`الهواء الجاف هو الفاعل المعتاد: المدافئ والمكيفات والرياح الصحراوية تسحب الرطوبة من أطراف الأوراق أولًا.`),
c('salt',`Salts, chlorine or fluoride in tap water build up in the soil and burn the tips; hard water makes it worse.`,`الأملاح والكلور والفلورايد في ماء الصنبور تتراكم في التربة وتحرق الأطراف؛ والماء العسر يزيد الأمر سوءًا.`),
c('dry',`Overwatering damaged the roots, so the tips cannot drink even though the soil is wet.`,`الريّ الزائد أضرّ بالجذور فلا تستطيع الأطراف أن ترتوي رغم أن التربة مبتلة.`),
c('k',`Potassium shortage makes frond tips brown and crisp.`,`نقص البوتاسيوم يجعل أطراف السعف بنية هشّة.`),
c('mid|wet',`The soil dried out completely between waterings.`,`جفّت التربة تمامًا بين الريّات.`),
c('heat',`Heat-wave scorch: hot wind and strong afternoon sun dry out the leaf edges.`,`حروق موجة الحر: الريح الحارة وشمس العصر القوية تجفّف حواف الأوراق.`),
c('*',`Fertiliser burn: too much feed leaves a salt crust that scorches the tips.`,`حرق التسميد: الإفراط في السماد يترك قشرة ملح تحرق الأطراف.`),
s('*',`Flush the pot with plenty of water until it runs freely from the holes, to wash out built-up salts.`,`اشطف الأصيص بكمية وفيرة من الماء حتى يخرج بحرية من الثقوب لإزالة الأملاح المتراكمة.`),
s('salt',`Switch to rested (left overnight), filtered or rain water.`,`انتقل إلى ماء مُرتاح (متروك ليلة) أو مفلتر أو ماء مطر.`),
s('humid|dryair',`Group plants together, use a pebble tray or a small humidifier, and keep them away from vents; avoid heavy misting.`,`اجمع النباتات معًا واستخدم صينية حصى أو مرطّبًا صغيرًا وأبعدها عن فتحات التكييف؛ وتجنّب الرشّ الكثيف.`),
s('mid|wet',`Water regularly, before the soil is bone dry.`,`اسقِ بانتظام قبل أن تجفّ التربة تمامًا.`),
s('dry',`Hold back on water and check the roots for rot.`,`خفّف الريّ وافحص الجذور بحثًا عن التعفّن.`),
s('heat',`Shade it at midday and keep it away from hot walls and wind.`,`ظلّله وقت الظهيرة وأبعده عن الجدران الحارة والريح.`),
s('k',`Apply a palm fertiliser with potassium.`,`أضف سماد نخيل يحتوي على البوتاسيوم.`),
s('*',`Trim only the brown tips following the leaf shape and leave a thin brown edge so you do not cut green tissue.`,`قصّ الأطراف البنية فقط باتباع شكل الورقة واترك حافة بنية رفيعة كي لا تقطع النسيج الأخضر.`),
p('*',`Keep plants away from vents, heaters and hot windows.`,`أبعد النباتات عن فتحات التكييف والمدافئ والنوافذ الحارة.`)
],
spots:[
c('blight',`Early or late blight: dark brown spots with yellow halos that spread fast in cool, humid weather.`,`اللفحة المبكرة أو المتأخرة: بقع بنية داكنة بهالة صفراء تنتشر بسرعة في الجو البارد الرطب.`),
c('scab',`Scab or leaf-spot fungus: olive-green to black spots, worse after wet spring weather.`,`فطر الجرب أو تبقّع الأوراق: بقع زيتونية إلى سوداء تزداد بعد أمطار الربيع.`),
c('rust',`Rust fungus: orange powdery pustules under the leaves with yellow spots on top.`,`فطر الصدأ: بثور برتقالية مسحوقية أسفل الأوراق مع بقع صفراء في أعلاها.`),
c('spot',`Fungal or bacterial leaf spot, spread by water splashing onto the leaves.`,`تبقّع فطري أو بكتيري تنشره قطرات الماء المتناثرة على الأوراق.`),
c('mites',`Spider mites: tiny pale or bronze speckles, often with fine webbing underneath.`,`العنكبوت الأحمر: نقاط صغيرة شاحبة أو برونزية وغالبًا خيوط رفيعة أسفل الورقة.`),
c('heat|chill',`Sunburn or cold damage: pale papery patches or sudden dark blotches after extreme weather.`,`حروق شمس أو برد: بقع شاحبة ورقيّة أو كتل داكنة مفاجئة بعد طقس متطرف.`),
c('*',`Water left on leaves overnight lets fungi and bacteria take hold.`,`بقاء الماء على الأوراق ليلًا يتيح للفطريات والبكتيريا الاستقرار.`),
s('*',`Isolate the plant and pick off badly spotted leaves; bin them rather than composting.`,`اعزل النبات وأزل الأوراق المصابة بشدة وتخلّص منها بدل تحويلها لسماد.`),
s('spot|blight|rust|scab',`If spots keep spreading, spray a copper fungicide (sulfur for rust and scab) every 7-10 days.`,`إن استمر الانتشار فرشّ مبيدًا فطريًا نحاسيًا (أو كبريتيًا للصدأ والجرب) كل 7-10 أيام.`),
s('mites',`Rinse leaf undersides and spray with soapy water or neem oil weekly for 3 weeks.`,`اغسل الجهة السفلية للأوراق ورشّ بماء وصابون أو زيت النيم أسبوعيًا لمدة 3 أسابيع.`),
s('*',`Water the soil, not the leaves, in the morning so foliage dries fast.`,`اسقِ التربة لا الأوراق وفي الصباح لتجفّ الأوراق بسرعة.`),
s('veg',`Rotate crops yearly and mulch the soil so spores do not splash up from the ground.`,`دوّر المحاصيل سنويًا وضع نشارة على التربة كي لا تتناثر الجراثيم من الأرض.`),
s('*',`Space plants out so air can move between them.`,`باعد بين النباتات ليمرّ الهواء بينها.`),
p('*',`Avoid overhead watering and clear fallen leaves.`,`تجنّب الريّ من فوق وأزل الأوراق المتساقطة.`)
],
powder:[
c('mildew',`Powdery mildew: white dust on leaves that thrives on warm days, cool humid nights and poor airflow.`,`البياض الدقيقي: غبار أبيض على الأوراق يزدهر في النهار الدافئ والليل البارد الرطب وقلة التهوية.`),
c('vine',`Vines and squash are especially prone to powdery mildew late in the season.`,`المتسلقات والكوسا عرضة بشكل خاص للبياض الدقيقي في آخر الموسم.`),
c('mealy|scale',`If it looks like cotton fluff rather than powder, it is mealybugs, not mildew.`,`إن بدا كزغب قطني لا كمسحوق فهو البق الدقيقي وليس البياض.`),
c('*',`Crowded plants and stagnant air let mildew spores spread.`,`ازدحام النباتات وركود الهواء يساعدان على انتشار جراثيم البياض.`),
s('*',`Isolate the plant and remove the worst affected leaves.`,`اعزل النبات وأزل الأوراق الأشد إصابة.`),
s('*',`Spray weekly with 1 teaspoon baking soda and a few drops of dish soap in 1 litre of water, or with neem oil.`,`رشّ أسبوعيًا بملعقة صغيرة صودا خبز وقطرات من سائل الجلي في لتر ماء، أو بزيت النيم.`),
s('veg|vine',`A spray of 1 part milk to 9 parts water works well on squash and cucumbers.`,`رشّة من جزء حليب إلى 9 أجزاء ماء تعمل جيدًا على الكوسا والخيار.`),
s('mealy',`Dab mealybugs with a cotton bud dipped in rubbing alcohol.`,`امسح البق الدقيقي بعود قطني مبلل بالكحول الطبي.`),
s('*',`Thin out stems and give more space so air moves through.`,`خفّف السيقان وأعطِ مساحة أكبر ليمرّ الهواء.`),
p('*',`Water in the morning and avoid late-evening overhead watering.`,`اسقِ صباحًا وتجنّب الريّ من فوق في آخر النهار.`)
],
droop:[
c('dry',`Drooping with wet soil points to overwatering or root rot, not thirst.`,`الذبول مع تربة مبتلة يشير إلى ريّ زائد أو تعفّن جذور لا إلى عطش.`),
c('mid',`Thirst: it has used up the water in the pot; leaves usually recover within hours of watering.`,`العطش: استهلك النبات ماء الأصيص؛ تنتعش الأوراق عادة خلال ساعات من الريّ.`),
c('wet',`This thirsty plant wilts quickly whenever the soil dries even slightly.`,`هذا النبات العطِش يذبل بسرعة كلما جفّت التربة ولو قليلًا.`),
c('heat',`Midday heat: leaves droop to lose less water and perk up in the evening, which is normal.`,`حرّ الظهيرة: تتدلى الأوراق لتفقد ماءً أقل وتنتعش مساءً، وهذا طبيعي.`),
c('blight',`Wilt disease (fusarium or verticillium): one-sided yellowing and drooping that does not recover after watering.`,`مرض الذبول (فيوزاريوم أو فيرتيسيليوم): اصفرار وتدلٍّ من جانب واحد لا يتعافى بعد الريّ.`),
c('rot',`Root or crown rot: drooping that does not recover, with a sour smell from the soil.`,`تعفّن الجذور أو التاج: ذبول لا يتعافى مع رائحة حامضة من التربة.`),
c('*',`Recent repotting, moving or a cold draught can shock the plant for a week or two.`,`إعادة التزهير أو النقل أو تيار هواء بارد قد يصدم النبات أسبوعًا أو اثنين.`),
s('*',`Check the soil first: the right fix depends on whether it is dry or wet.`,`افحص التربة أولًا: العلاج الصحيح يعتمد على جفافها أو رطوبتها.`),
s('mid|wet',`If dry, water slowly until it drains from the bottom; it should perk up within a few hours.`,`إن كانت جافة فاسقِ ببطء حتى يخرج الماء من الأسفل؛ ينتعش النبات خلال ساعات.`),
s('dry|rot',`If wet and smelly, unpot, trim rotten roots and repot in fresh dry mix; water lightly for a week.`,`إن كانت رطبة ذات رائحة فأخرجه وقصّ الجذور المتعفنة وأعد زراعته في تربة جديدة جافة؛ واسقِ قليلًا لأسبوع.`),
s('heat',`Shade it at midday and water in the early morning or evening, never in full sun.`,`ظلّله وقت الظهيرة واسقِ في الصباح الباكر أو المساء ولا تسقِ تحت الشمس الحارقة.`),
s('blight',`Cut the stem near the base: brown streaks inside mean wilt disease, so remove the plant and do not replant tomatoes or peppers there for 3 years.`,`اقطع الساق قرب القاعدة: خطوط بنية بالداخل تعني مرض الذبول، فأزل النبات ولا تزرع طماطم أو فلفلًا في المكان 3 سنوات.`),
s('*',`Do not feed a drooping plant until it has recovered.`,`لا تسمّد نباتًا ذابلًا قبل أن يتعافى.`),
p('*',`Lift the pot: a light pot means it is time to water.`,`ارفع الأصيص: الأصيص الخفيف يعني أن وقت الريّ حان.`)
],
curl:[
c('heat|dryair',`Heat or dry air makes leaves curl to save water.`,`الحرّ أو جفاف الهواء يجعل الأوراق تلتف لتوفير الماء.`),
c('aphids',`Aphids feeding on young growth twist and curl the new leaves.`,`المنّ الذي يتغذى على النمو الجديد يلوي الأوراق الصغيرة ويجعّدها.`),
c('thrips',`Thrips leave silvery streaks and curled, distorted new leaves.`,`الثريبس يترك خطوطًا فضية وأوراقًا جديدة ملتفة مشوّهة.`),
c('mites',`Spider mites curl leaves and add fine speckles.`,`العنكبوت الأحمر يلفّ الأوراق ويضيف نقاطًا دقيقة.`),
c('curl',`Leaf curl fungus: thick, red-pink blistered leaves in spring.`,`فطر تجعّد الأوراق: أوراق سميكة محمرّة منتفخة في الربيع.`),
c('dry',`Overwatering can also curl leaves downward and make them feel limp.`,`الريّ الزائد قد يلفّ الأوراق للأسفل ويجعلها رخوة.`),
c('mid|wet',`Underwatering makes leaves roll inward like a tube.`,`قلّة الريّ تجعل الأوراق تلتف للداخل كالأنبوب.`),
c('*',`Herbicide or chemical drift from nearby spraying can twist new growth.`,`رذاذ مبيدات الأعشاب أو مواد كيميائية من رشّ قريب قد يلوي النمو الجديد.`),
s('heat|dryair',`Move it away from hot windows and vents, and raise the humidity.`,`أبعده عن النوافذ الحارة وفتحات التكييف وارفع الرطوبة.`),
s('mid|wet',`Water deeply, then let the excess drain.`,`اسقِ بعمق ثم اترك الزائد يصرّف.`),
s('aphids|thrips|mites',`Inspect leaf undersides and treat with soapy water or neem oil weekly for 3 weeks.`,`افحص الجهة السفلية للأوراق وعالج بماء وصابون أو زيت النيم أسبوعيًا لمدة 3 أسابيع.`),
s('curl',`Spray copper fungicide in late winter at bud swell and again before bloom; remove and bin affected leaves.`,`رشّ مبيدًا نحاسيًا في أواخر الشتاء عند انتفاخ البراعم ومرة أخرى قبل الإزهار؛ وأزل الأوراق المصابة وتخلّص منها.`),
s('*',`Cut off the worst twisted leaves so new growth comes in clean.`,`قصّ الأوراق الأشد التواءً ليخرج النمو الجديد سليمًا.`),
p('*',`Mist the air around (not the leaves) or group plants during heat waves.`,`رطّب الهواء حول النبات (لا الأوراق) أو اجمع النباتات أثناء موجات الحر.`)
],
pests:[
c('mites',`Spider mites: fine webbing and pale speckled leaves; they love hot, dry air.`,`العنكبوت الأحمر: خيوط رفيعة وأوراق شاحبة منقّطة؛ يحب الهواء الحار الجاف.`),
c('aphids',`Aphids: clusters of small green, black or yellow insects on new shoots and buds.`,`المنّ: تجمعات حشرات صغيرة خضراء أو سوداء أو صفراء على البراعم والنموات الجديدة.`),
c('mealy',`Mealybugs: white cotton-like fluff in leaf joints and under leaves.`,`البق الدقيقي: زغب أبيض قطني في مفاصل الأوراق وأسفلها.`),
c('scale',`Scale insects: small brown bumps on stems and veins that you can scrape off.`,`الحشرات القشرية: نتوءات بنية صغيرة على السيقان والعروق يمكن كشطها.`),
c('thrips',`Thrips: tiny slender insects causing silvery streaks and black specks.`,`الثريبس: حشرات دقيقة رفيعة تسبب خطوطًا فضية ونقاطًا سوداء.`),
c('whitefly',`Whiteflies: tiny white moths that fly up when you shake the plant.`,`الذبابة البيضاء: فراشات بيضاء صغيرة تطير عند هزّ النبات.`),
c('gnats',`Fungus gnats: tiny flies around the soil, a sign it stays too wet.`,`ذباب الفطر: ذباب صغير حول التربة، دليل على بقائها رطبة جدًا.`),
c('borer',`Borers: sawdust-like frass, holes in the trunk or gummy sap.`,`الحفّارات: نشارة شبيهة بالنشارة الخشبية وثقوب في الجذع أو صمغ.`),
c('caterpillar',`Caterpillars: chewed leaves with dark droppings.`,`اليرقات: أوراق مقضومة مع فضلات داكنة.`),
c('snail',`Snails and slugs: ragged holes and silvery trails at night.`,`القواقع والبزاقات: ثقوب ممزقة وآثار فضية ليلًا.`),
c('miner',`Leaf miners: winding pale tunnels inside the leaves.`,`حفّارات الأوراق: أنفاق شاحبة متعرجة داخل الأوراق.`),
c('*',`Stressed or weak plants attract pests more easily.`,`النباتات المجهدة أو الضعيفة تجذب الآفات بسهولة أكبر.`),
s('*',`Isolate the plant right away.`,`اعزل النبات فورًا.`),
s('mites|aphids|thrips|whitefly',`Rinse the plant under the shower (tops and undersides), then spray with soapy water or neem oil every 5-7 days for 3 weeks.`,`اغسل النبات تحت الدش (الأعلى والأسفل) ثم رشّ بماء وصابون أو زيت النيم كل 5-7 أيام لمدة 3 أسابيع.`),
s('mealy|scale',`Dab each insect with rubbing alcohol on a cotton bud, scrape off scale, then spray neem or horticultural oil.`,`امسح كل حشرة بعود قطني مبلل بالكحول الطبي واكشط القشرية ثم رشّ النيم أو الزيت البستاني.`),
s('whitefly|thrips',`Hang yellow (whitefly) or blue (thrips) sticky traps beside the plant.`,`علّق مصائد لاصقة صفراء (للذبابة البيضاء) أو زرقاء (للثريبس) بجانب النبات.`),
s('gnats',`Let the top 3-4 cm of soil dry between waterings; use sticky traps or a BTi drench.`,`دع أول 3-4 سم من التربة تجفّ بين الريّات واستخدم مصائد لاصقة أو منقوع BTi.`),
s('borer',`Cut out affected wood and treat the holes; for palms, call the agriculture authority without delay.`,`اقطع الخشب المصاب وعالج الثقوب؛ وفي النخيل تواصل فورًا مع جهة الزراعة المختصة.`),
s('caterpillar',`Pick them off by hand in the evening or spray Bt (Bacillus thuringiensis).`,`التقطها يدويًا مساءً أو رشّ بكتيريا Bt.`),
s('snail',`Go out after dark to pick them off, use iron-phosphate bait or a beer trap, and keep leaves off the soil.`,`اخرج ليلًا لالتقاطها واستخدم طُعم فوسفات الحديد أو مصيدة البيرة وأبعد الأوراق عن التربة.`),
s('miner',`Remove and bin mined leaves; yellow sticky traps catch the adults.`,`أزل الأوراق المحفورة وتخلّص منها؛ والمصائد الصفراء تصطاد البالغات.`),
s('*',`Repeat treatments every 5-7 days, because eggs survive the first spray.`,`كرّر العلاج كل 5-7 أيام لأن البيض ينجو من الرشّة الأولى.`),
p('*',`Quarantine new plants for a week before placing them with others.`,`احجر النباتات الجديدة أسبوعًا قبل وضعها مع غيرها.`)
],
sticky:[
c('aphids|scale|whitefly|mealy',`Sap-sucking insects (aphids, scale, whiteflies, mealybugs) leave sticky honeydew.`,`الحشرات الماصّة للعصارة (المنّ والقشرية والذبابة البيضاء والبق الدقيقي) تترك مادة عسلية لزجة.`),
c('*',`Black sooty mould grows on the honeydew, and ants farm the insects for it.`,`ينمو السخام الأسود على المادة العسلية والنمل يربّي الحشرات من أجلها.`),
c('tree',`Honeydew can also drip from an infested tree above the plant.`,`قد تتساقط المادة العسلية أيضًا من شجرة مصابة فوق النبات.`),
s('*',`Wipe or rinse leaves with warm soapy water to remove the film.`,`امسح الأوراق أو اغسلها بماء دافئ وصابون لإزالة الطبقة.`),
s('aphids|scale|whitefly|mealy',`Treat the insects themselves (see "Insects seen") or the film returns.`,`عالج الحشرات نفسها (انظر «حشرات ظاهرة») وإلا ستعود الطبقة.`),
s('*',`Keep ants off the stems with a sticky barrier or ant bait.`,`أبعد النمل عن السيقان بحاجز لاصق أو طُعم نمل.`),
p('*',`Check new shoots weekly: catching a few insects early prevents the sticky mess.`,`افحص النموات الجديدة أسبوعيًا: التقاط بضع حشرات مبكرًا يمنع الطبقة اللزجة.`)
],
leggy:[
c('full|bright|shade',`Not enough light: stems stretch toward the window and new leaves come out small and pale.`,`ضوء غير كافٍ: تمتد السيقان نحو النافذة وتخرج أوراق جديدة صغيرة شاحبة.`),
c('bolt',`Bolting: heat and long days push herbs and greens to stretch and flower, and leaves turn bitter.`,`الإشطاء: الحرّ والنهار الطويل يدفعان الأعشاب والخضار إلى الاستطالة والإزهار فتصبح الأوراق مرّة.`),
c('succ',`Etiolation: succulents stretch and lose their tight shape when light is weak.`,`الاستطالة: تمتد العصاريات وتفقد شكلها المضغوط عند ضعف الضوء.`),
c('n',`Too much nitrogen gives soft, floppy growth.`,`الإفراط في النيتروجين يعطي نموًا رخوًا متدليًا.`),
c('trail',`Trailing plants get long bare stems when they are not pinched back.`,`النباتات المتدلية تصبح سيقانها طويلة عارية إن لم تُقرص.`),
c('*',`Crowding with other plants shades the lower stems.`,`الازدحام مع نباتات أخرى يظلل السيقان السفلية.`),
s('full|bright|shade|succ',`Move to the brightest spot you have, with several hours of sun, or add a grow light.`,`انقله إلى أكثر مكان مشرق لديك بعدة ساعات من الشمس أو أضف إضاءة نمو.`),
s('bolt',`Pinch off flower buds, give afternoon shade in summer, and sow a new batch every 3-4 weeks.`,`اقرص البراعم الزهرية وأعطِ ظل العصر صيفًا وازرع دفعة جديدة كل 3-4 أسابيع.`),
s('succ',`Behead the stretched rosette, let the cut dry for 3-4 days, then root it in dry gritty mix.`,`اقطع الوردة المستطيلة واترك القطع يجفّ 3-4 أيام ثم جذّرها في تربة خشنة جافة.`),
s('*',`Prune stretched stems back to a leaf pair to encourage bushy growth.`,`قصّ السيقان الممتدة إلى زوج أوراق لتشجيع نمو كثيف.`),
s('*',`Rotate the pot a quarter turn every week to keep growth even.`,`أدر الأصيص ربع دورة كل أسبوع ليبقى النمو متوازنًا.`),
p('*',`Wipe dust off leaves so they catch more light.`,`امسح الغبار عن الأوراق لتلتقط ضوءًا أكثر.`)
],
mushy:[
c('succ',`Succulent rot: even one overwatering, or a pot without drainage, can turn the base mushy overnight.`,`تعفّن العصاريات: ريّة زائدة واحدة أو أصيص بلا تصريف قد يحوّل القاعدة إلى طرية بين ليلة وضحاها.`),
c('orch',`Crown rot: water trapped in the centre of the plant between the leaves.`,`تعفّن التاج: ماء محبوس في قلب النبات بين الأوراق.`),
c('bulb',`Bulb rot: the soil stayed wet around the bulb.`,`تعفّن البصلة: بقيت التربة رطبة حول البصلة.`),
c('rot',`Root or stem rot: roots sit in water and decay, so the base turns soft and smells sour.`,`تعفّن الجذور أو الساق: تبقى الجذور في الماء وتتحلل فتصبح القاعدة طرية وذات رائحة حامضة.`),
c('chill',`Frost or cold wet soil can turn tissue soft and dark.`,`الصقيع أو التربة الباردة المبتلة قد تحوّل النسيج إلى طري داكن.`),
c('*',`Heavy soil or a saucer full of water keeps roots drowning.`,`التربة الثقيلة أو صحن ممتلئ بالماء يبقي الجذور غارقة.`),
s('*',`Slide the plant out, rinse the roots and cut away everything black, brown or mushy with clean scissors.`,`أخرج النبات واشطف الجذور وقصّ كل ما هو أسود أو بني أو طري بمقص نظيف.`),
s('succ',`Let the cut surface dry and callus for 3-5 days before repotting in dry gritty cactus mix.`,`اترك سطح القطع يجفّ ويلتئم 3-5 أيام قبل إعادة الزراعة في تربة صبّار خشنة جافة.`),
s('orch',`Dust cuts with cinnamon, never leave water in the crown, and water in the morning so it dries by night.`,`ضع القرفة على القطوع ولا تترك ماءً في القلب واسقِ صباحًا ليجفّ قبل المساء.`),
s('*',`Repot in fresh, airy mix in a pot with drainage holes and water lightly for a week.`,`أعد الزراعة في تربة جديدة مهوّاة بأصيص مثقوب واسقِ قليلًا لأسبوع.`),
s('tree',`For trees and shrubs, keep the trunk base dry and the soil level below the graft or root flare.`,`في الأشجار والشجيرات أبقِ قاعدة الجذع جافة ومستوى التربة تحت منطقة التطعيم.`),
p('*',`Never leave water standing in the saucer.`,`لا تترك الماء راكدًا في الصحن أبدًا.`)
],
dropleaves:[
c('autumn',`Autumn leaf fall is natural for deciduous plants as days get shorter and colder.`,`تساقط أوراق الخريف طبيعي للنباتات المتساقطة الأوراق مع قِصَر النهار وبرودته.`),
c('drop',`Ficus and similar plants drop leaves when moved, in draughts, or when watering changes suddenly.`,`الفيكس وأمثاله يُسقط أوراقه عند النقل أو تيارات الهواء أو تغيّر الريّ المفاجئ.`),
c('chill',`Cold snap: leaves fall after a night below the plant's comfort range.`,`موجة برد: تسقط الأوراق بعد ليلة أبرد من مجال راحة النبات.`),
c('dry',`Overwatering and root rot make leaves yellow and drop, starting with the lower ones.`,`الريّ الزائد وتعفّن الجذور يصفّران الأوراق ويُسقطانها بدءًا من السفلية.`),
c('mid|wet',`Dry soil or very dry air makes leaves drop from the bottom up.`,`جفاف التربة أو الهواء الشديد يُسقط الأوراق من الأسفل إلى الأعلى.`),
c('heat',`Heat stress and hot wind make plants shed leaves to save water.`,`إجهاد الحر والريح الحارة يجعلان النبات يُسقط أوراقه ليوفّر الماء.`),
c('flower',`Buds and flowers drop when conditions change suddenly: moving, draughts or uneven watering.`,`تسقط البراعم والأزهار عند تغيّر الظروف فجأة: النقل أو التيارات أو الريّ غير المنتظم.`),
c('*',`A change of place, pot or light causes shock and some leaf loss.`,`تغيير المكان أو الأصيص أو الضوء يسبب صدمة وبعض التساقط.`),
s('autumn',`No treatment: reduce watering, stop feeding and mulch the base.`,`لا علاج: قلّل الريّ وأوقف التسميد وضع نشارة عند القاعدة.`),
s('*',`Keep it in one steady, bright spot away from vents and doors, and do not move it for a few weeks.`,`ثبّته في مكان مشرق ثابت بعيدًا عن فتحات التكييف والأبواب ولا تنقله لأسابيع.`),
s('dry',`Let the soil dry deeper between waterings and check the roots.`,`اترك التربة تجفّ أعمق بين الريّات وافحص الجذور.`),
s('mid|wet',`Water evenly and raise humidity with a pebble tray or by grouping plants.`,`اسقِ بانتظام وارفع الرطوبة بصينية حصى أو بجمع النباتات.`),
s('heat',`Shade it at midday and water deeply in the early morning.`,`ظلّله وقت الظهيرة واسقِ بعمق في الصباح الباكر.`),
s('chill',`Protect from cold: bring indoors or cover with fleece overnight.`,`احمه من البرد: أدخله أو غطِّه بقماش واقٍ ليلًا.`),
s('*',`Do not prune or feed until new leaves appear.`,`لا تقلّم ولا تسمّد حتى تظهر أوراق جديدة.`),
p('*',`Make changes to light, water and location gradually over 1-2 weeks.`,`غيّر الضوء والريّ والمكان تدريجيًا على مدى 1-2 أسبوع.`)
],
bleached:[
c('shade|bright',`Direct sun scorches shade-loving leaves: pale papery patches on the side facing the window.`,`الشمس المباشرة تحرق أوراق النباتات المحبة للظل: بقع شاحبة ورقية على الجهة المقابلة للنافذة.`),
c('succ',`Succulents bleach, turn white or tan in intense midsummer sun or behind hot glass.`,`تبيضّ العصاريات أو تتحول إلى بيج في شمس منتصف الصيف الشديدة أو خلف الزجاج الحار.`),
c('full',`A sudden move into strong sun without hardening off bleaches leaves, even on sun-loving plants.`,`النقل المفاجئ إلى شمس قوية دون تدريج يبيّض الأوراق حتى في النباتات المحبة للشمس.`),
c('heat',`Heat-wave scorch: hot wind and midday sun dry tissue to a pale tan.`,`حروق موجة الحر: الريح الحارة وشمس الظهيرة تجفّف النسيج إلى بيج شاحب.`),
c('chill',`Frost damage: leaves turn pale, then brown and papery after a freezing night.`,`ضرر الصقيع: تشحب الأوراق ثم تتحول إلى بنية ورقية بعد ليلة متجمدة.`),
c('mites',`Spider mite damage can look like bleached stippling.`,`ضرر العنكبوت الأحمر قد يبدو كنقاط مبيّضة.`),
c('*',`Spraying water, soap or oil in strong sun can leave burn marks.`,`الرشّ بالماء أو الصابون أو الزيت تحت شمس قوية قد يترك علامات حرق.`),
s('*',`Move it out of direct midday sun, or add a sheer curtain or 30-40% shade net.`,`انقله بعيدًا عن شمس الظهيرة المباشرة أو أضف ستارة شفافة أو شبكة تظليل 30-40%.`),
s('full|succ',`Harden it gradually: increase sun exposure over 7-10 days.`,`دعّمه تدريجيًا: زد التعرض للشمس على مدى 7-10 أيام.`),
s('chill',`Cover with fleece on cold nights and wait before pruning, since damage shows days later.`,`غطِّه بقماش واقٍ في الليالي الباردة وانتظر قبل التقليم فالضرر يظهر بعد أيام.`),
s('*',`Remove badly burnt leaves, since they will not recover; new growth will be fine.`,`أزل الأوراق المحروقة بشدة فهي لن تتعافى؛ سيخرج نمو جديد سليم.`),
s('mites',`Check leaf undersides for webbing and treat with soapy water.`,`افحص الجهة السفلية بحثًا عن خيوط وعالج بماء وصابون.`),
p('*',`Spray only in the early morning or evening.`,`رشّ في الصباح الباكر أو المساء فقط.`)
],
holes:[
c('caterpillar',`Caterpillars chew ragged holes and leave dark droppings.`,`اليرقات تقضم ثقوبًا ممزقة وتترك فضلات داكنة.`),
c('snail',`Snails and slugs leave ragged holes and silvery slime trails, mostly at night.`,`القواقع والبزاقات تترك ثقوبًا ممزقة وآثار مخاط فضية، غالبًا ليلًا.`),
c('miner',`Leaf miners tunnel inside leaves, leaving winding pale lines.`,`حفّارات الأوراق تحفر داخل الورقة وتترك خطوطًا شاحبة متعرجة.`),
c('spot',`Fungal shot-hole: round spots fall out, leaving neat small holes.`,`مرض الثقوب الفطري: تسقط البقع الدائرية تاركة ثقوبًا صغيرة منتظمة.`),
c('*',`Grasshoppers, beetles or weevils chew the edges, often at night.`,`الجراد والخنافس والسوس تقضم الحواف غالبًا ليلًا.`),
s('caterpillar',`Pick caterpillars off by hand in the evening or spray Bt.`,`التقط اليرقات يدويًا مساءً أو رشّ Bt.`),
s('snail',`Hunt with a torch after dark, use iron-phosphate bait or a beer trap.`,`ابحث بمصباح بعد الغروب واستخدم طُعم فوسفات الحديد أو مصيدة البيرة.`),
s('miner',`Pick off and bin mined leaves.`,`اقطف الأوراق المحفورة وتخلّص منها.`),
s('spot',`Spray copper fungicide and clear fallen leaves.`,`رشّ مبيدًا نحاسيًا وأزل الأوراق المتساقطة.`),
s('*',`Check the plant at dusk with a torch to catch the culprit, then choose the treatment.`,`افحص النبات عند الغسق بمصباح لتكتشف الفاعل ثم اختر العلاج.`),
s('*',`Cover young plants with fine insect net.`,`غطِّ النباتات الصغيرة بشبك حشرات ناعم.`),
p('*',`Remove hiding places such as debris, boards and thick mulch near stems.`,`أزل أماكن الاختباء مثل الأنقاض والألواح والنشارة السميكة قرب السيقان.`)
],
noflower:[
c('full|bright|shade',`Not enough light: flowering needs far more light than leaf growth.`,`ضوء غير كافٍ: الإزهار يحتاج ضوءًا أكثر بكثير من نمو الأوراق.`),
c('n',`Too much nitrogen fertiliser gives lush leaves but few flowers or fruit.`,`الإفراط في سماد النيتروجين يعطي أوراقًا وفيرة وأزهارًا أو ثمارًا قليلة.`),
c('chillneed',`Many stone and pome fruits, grapes, tulips and hyacinths need a cold winter spell (chill hours) to flower; mild winters give poor bloom.`,`كثير من فاكهة النواة والتفاحيات والعنب والتوليب والياقوت يحتاج برد الشتاء (ساعات البرودة) ليزهر؛ والشتاء الدافئ يضعف الإزهار.`),
c('orch',`Orchids need a night drop of about 5-8°C for 2-3 weeks plus bright light to start a flower spike.`,`الأوركيد يحتاج هبوطًا ليليًا بنحو 5-8°م لمدة 2-3 أسابيع مع ضوء ساطع ليبدأ ساق الإزهار.`),
c('flower',`Pruning at the wrong time cuts off the flower buds that formed last season.`,`التقليم في وقت خاطئ يقطع البراعم الزهرية المتكونة الموسم الماضي.`),
c('fruit',`Poor pollination: few bees, or wind and extreme heat at bloom time.`,`ضعف التلقيح: قلة النحل أو الريح والحر الشديد وقت الإزهار.`),
c('heat',`Extreme heat above 35°C makes flowers and buds drop.`,`الحر الشديد فوق 35°م يُسقط الأزهار والبراعم.`),
c('tree',`Young trees often need 2-5 years before they flower or fruit.`,`الأشجار الصغيرة تحتاج غالبًا 2-5 سنوات قبل الإزهار والإثمار.`),
c('bulb',`If leaves were cut early, the bulb could not store energy for next year's flowers.`,`إن قُطعت الأوراق مبكرًا لم تستطع البصلة تخزين الطاقة لإزهار العام القادم.`),
c('*',`Too much water or an oversized pot keeps it in leafy growth.`,`الريّ الزائد أو الأصيص الكبير جدًا يُبقي النبات في نمو ورقي.`),
s('full|bright|shade',`Give it the brightest place or full sun, depending on the plant.`,`ضعه في أكثر الأماكن إشراقًا أو في شمس كاملة حسب النبات.`),
s('n',`Stop high-nitrogen feeds and switch to a high-potash fertiliser (tomato or flower food).`,`أوقف الأسمدة عالية النيتروجين وانتقل إلى سماد غني بالبوتاس (سماد طماطم أو أزهار).`),
s('chillneed',`Choose low-chill varieties for mild climates; chill bulbs in the fridge for 6-10 weeks before planting.`,`اختر أصنافًا قليلة الاحتياج للبرودة للمناخ الدافئ؛ وبرّد البصيلات في الثلاجة 6-10 أسابيع قبل الزراعة.`),
s('orch',`Put it somewhere cooler at night for 2-3 weeks and feed with a bloom-booster fertiliser.`,`ضعه في مكان أبرد ليلًا لمدة 2-3 أسابيع وسمّده بسماد محفّز للإزهار.`),
s('flower',`Prune right after flowering, not before.`,`قلّم مباشرة بعد الإزهار لا قبله.`),
s('fruit',`Hand-pollinate with a soft brush in the morning and plant flowers that attract bees.`,`لقّح يدويًا بفرشاة ناعمة صباحًا وازرع أزهارًا تجذب النحل.`),
s('heat',`Use shade net and deep watering during heat waves, and mulch the roots.`,`استخدم شبكة تظليل وريًّا عميقًا أثناء موجات الحر وضع نشارة على الجذور.`),
s('bulb',`Let leaves yellow naturally before cutting them back.`,`اترك الأوراق تصفرّ طبيعيًا قبل قصّها.`),
s('*',`Be patient and keep regular care; do not change everything at once.`,`تحلَّ بالصبر وحافظ على العناية المنتظمة ولا تغيّر كل شيء دفعة واحدة.`),
p('*',`Feed lightly before bloom time and avoid pruning in autumn.`,`سمّد بخفة قبل موسم الإزهار وتجنّب التقليم في الخريف.`)
],
fruit:[
c('ca',`Blossom-end rot: a black, sunken patch at the fruit base, caused by uneven watering that blocks calcium uptake.`,`عفن الطرف الزهري: بقعة سوداء غائرة في قاعدة الثمرة سببها ريّ غير منتظم يمنع امتصاص الكالسيوم.`),
c('rot',`Grey mould or soft rot on fruit in damp weather, especially when fruit touches wet soil.`,`عفن رمادي أو طري على الثمار في الجو الرطب وخاصة عند ملامسة التربة المبتلة.`),
c('tree',`Fruit drop: drought, heat or a heavy crop makes trees shed fruitlets.`,`تساقط الثمار: الجفاف أو الحر أو المحصول الثقيل يجعل الشجرة تُسقط الثمار الصغيرة.`),
c('caterpillar',`Fruit worms (codling moth and similar) tunnel into the fruit.`,`ديدان الثمار (فراشة التفاح وأمثالها) تحفر داخل الثمار.`),
c('vine',`Misshapen or bitter fruit points to poor pollination or water stress.`,`الثمار المشوّهة أو المرّة تشير إلى ضعف التلقيح أو إجهاد مائي.`),
c('*',`Birds, rodents or insects damage the ripening fruit.`,`الطيور أو القوارض أو الحشرات تتلف الثمار أثناء النضج.`),
s('ca',`Water evenly with mulch, add calcium only if the soil is low, and remove affected fruit.`,`اسقِ بانتظام مع نشارة وأضف كالسيومًا فقط إن كانت التربة فقيرة وأزل الثمار المصابة.`),
s('rot',`Mulch with straw, pick ripe fruit promptly and remove rotten fruit right away.`,`ضع نشارة قش واقطف الثمار الناضجة بسرعة وأزل المتعفنة فورًا.`),
s('tree',`Water deeply in dry spells and thin heavy crops to one fruit per cluster.`,`اسقِ بعمق في فترات الجفاف وخفّف المحصول الثقيل إلى ثمرة في كل عنقود.`),
s('caterpillar',`Use pheromone traps and Bt, and collect fallen fruit.`,`استخدم مصائد الفيرومون وBt والتقط الثمار المتساقطة.`),
s('vine',`Hand-pollinate and water consistently; never let soil swing from dry to flooded.`,`لقّح يدويًا واسقِ بانتظام ولا تدع التربة تتأرجح بين الجفاف والغمر.`),
s('*',`Net the plant or bag the ripening fruit to protect it.`,`غطِّ النبات بشبك أو ضع الثمار الناضجة في أكياس لحمايتها.`),
p('*',`Mulch to keep soil moisture steady.`,`ضع نشارة لتثبيت رطوبة التربة.`)
],
stunted:[
c('chill',`Cold slows growth; it is normal for many plants to rest in winter.`,`البرد يبطئ النمو؛ وكثير من النباتات ترتاح في الشتاء بشكل طبيعي.`),
c('full|bright',`Low light means slow growth.`,`الضوء القليل يعني نموًا بطيئًا.`),
c('n',`Poor soil or no feeding: new growth is small and pale.`,`تربة فقيرة أو بلا تسميد: النمو الجديد صغير وشاحب.`),
c('salt',`Salt build-up in the soil stops roots from absorbing water.`,`تراكم الأملاح في التربة يمنع الجذور من امتصاص الماء.`),
c('*',`Root-bound plants circle the pot, with roots poking out of the drain holes.`,`النباتات الملتفة الجذور تدور جذورها في الأصيص وتخرج من ثقوب التصريف.`),
c('dry',`Some plants are naturally slow growers and simply need patience.`,`بعض النباتات بطيئة النمو بطبيعتها وتحتاج الصبر فقط.`),
s('*',`Check the roots: if they circle the pot or poke out of the holes, repot into a pot 2-4 cm wider in spring.`,`افحص الجذور: إن كانت تلتف أو تخرج من الثقوب فانقله إلى أصيص أوسع بـ2-4 سم في الربيع.`),
s('n',`Feed in spring and summer with a balanced fertiliser at half strength.`,`سمّد في الربيع والصيف بسماد متوازن بنصف التركيز.`),
s('full|bright',`Move it to a brighter spot.`,`انقله إلى مكان أكثر إشراقًا.`),
s('salt',`Flush the soil with plenty of water to wash out salts.`,`اشطف التربة بكمية وفيرة من الماء لإزالة الأملاح.`),
s('chill',`Reduce watering, stop feeding and wait for spring.`,`قلّل الريّ وأوقف التسميد وانتظر الربيع.`),
p('*',`Repot every 1-2 years and feed in the growing season only.`,`أعد الزراعة كل 1-2 سنة وسمّد في موسم النمو فقط.`)
],
redpurple:[
c('chill',`Cold nights cause red or purple leaves, often because cold soil locks up phosphorus.`,`الليالي الباردة تسبب أوراقًا حمراء أو بنفسجية غالبًا لأن التربة الباردة تحبس الفوسفور.`),
c('full',`Strong light or sun stress makes leaves build red or purple pigments to protect themselves.`,`الضوء القوي أو إجهاد الشمس يجعل الأوراق تكوّن أصباغًا حمراء أو بنفسجية للحماية.`),
c('veg',`Phosphorus shortage turns leaves dark purple from underneath, common in young seedlings.`,`نقص الفوسفور يحوّل الأوراق إلى بنفسجي داكن من الأسفل، وهو شائع في الشتلات الصغيرة.`),
c('*',`Some varieties are naturally red or purple, so compare with how it looked when you bought it.`,`بعض الأصناف حمراء أو بنفسجية بطبيعتها فقارن بشكله عند الشراء.`),
s('chill',`Protect from cold nights and wait for the soil to warm; growth will green up.`,`احمه من الليالي الباردة وانتظر دفء التربة وسيعود أخضر.`),
s('veg',`Feed with a balanced fertiliser with phosphorus and keep seedlings warm.`,`سمّد بسماد متوازن فيه فوسفور وأبقِ الشتلات دافئة.`),
s('full',`Give light afternoon shade; the colour is harmless if the plant is otherwise healthy.`,`أعطِه ظلًا خفيفًا بعد الظهر؛ اللون غير ضار إن كان النبات سليمًا.`),
s('*',`If new leaves come out green and the plant is growing, no treatment is needed.`,`إن خرجت أوراق جديدة خضراء والنبات ينمو فلا حاجة لعلاج.`),
p('*',`Avoid planting out before the soil has warmed up in spring.`,`تجنّب الزراعة قبل أن تدفأ التربة في الربيع.`)
]
};

/* species-specific advice: [cause EN, cause AR, step EN, step AR] under a symptom key, plus tip */
const OV={
monstera:{stunted:[`No leaf splits? Young Monstera make solid leaves; splits (fenestration) come with maturity, strong indirect light and a moss pole to climb.`,`لا تشقّقات في الأوراق؟ المونستيرا الصغيرة تُخرج أوراقًا كاملة؛ التشقّق يأتي مع النضج والضوء القوي غير المباشر وعمود طحلب للتسلق.`,`Add a moss pole, brighter light and monthly feeding in summer.`,`أضف عمود طحلب وضوءًا أكثر وسمّد شهريًا في الصيف.`],holes:[`Natural splits and holes in mature leaves are normal for Monstera, not damage.`,`الشقوق والثقوب الطبيعية في الأوراق الناضجة طبيعية في المونستيرا وليست ضررًا.`,`Only worry if holes have brown edges or appear on young unfurling leaves.`,`لا تقلق إلا إذا كانت لها حواف بنية أو ظهرت في أوراق صغيرة لم تتفتح بعد.`]},
pothos:{yellow:[`Pothos tolerates dry soil far better than wet: yellow leaves with soft stems mean too much water.`,`البوتس يتحمل الجفاف أفضل بكثير من الرطوبة: أوراق صفراء مع سيقان طرية تعني ماءً زائدًا.`,`Let the top 5 cm dry, and give it a drain-friendly pot.`,`اترك أول 5 سم تجفّ واستخدم أصيصًا جيد التصريف.`]},
peace:{browntips:[`Peace lily is very sensitive to fluoride and chlorine, and its tips brown even with good care.`,`زنبق السلام حساس جدًا للفلورايد والكلور وتبنّ أطرافه حتى مع عناية جيدة.`,`Use filtered or rain water and trim tips at an angle.`,`استخدم ماءً مفلترًا أو ماء مطر وقصّ الأطراف بشكل مائل.`],droop:[`Peace lily droops dramatically when thirsty and recovers within hours: a handy watering reminder.`,`زنبق السلام يتدلى بشدة عند العطش وينتعش خلال ساعات: منبّه ريّ مفيد.`,`Water thoroughly when it droops lightly; do not wait for a full collapse.`,`اسقِه عند أول تدلٍّ خفيف ولا تنتظر الانهيار الكامل.`],noflower:[`Peace lily needs medium bright light (not deep shade) and monthly feeding in spring and summer to bloom.`,`زنبق السلام يحتاج ضوءًا متوسطًا ساطعًا (لا ظلًا عميقًا) وتسميدًا شهريًا في الربيع والصيف ليزهر.`,`Move it to bright indirect light and feed with a bloom fertiliser.`,`انقله إلى ضوء غير مباشر ساطع وسمّده بسماد أزهار.`]},
fiddle:{spots:[`Fiddle-leaf fig brown spots with a dark edge are usually overwatering or bacterial leaf spot; central brown patches mean root rot.`,`البقع البنية بحافة داكنة في تين الكمان غالبًا ريّ زائد أو تبقّع بكتيري؛ والبقع المركزية تعني تعفّن الجذور.`,`Water only when the top 5 cm are dry, and remove spotted leaves.`,`اسقِ فقط عند جفاف أول 5 سم وأزل الأوراق المبقّعة.`],dropleaves:[`Fiddle-leaf figs drop leaves after being moved, in draughts or when soil swings between wet and dry.`,`تين الكمان يُسقط أوراقه بعد النقل أو في التيارات أو عند تأرجح التربة بين الرطب والجاف.`,`Pick a bright, steady spot and water on a consistent schedule.`,`اختر مكانًا مشرقًا ثابتًا واسقِ بجدول منتظم.`]},
snake:{mushy:[`Snake plant leaves go soft and fall over at the base from overwatering; water only every 2-3 weeks (monthly in winter).`,`أوراق لسان الحماة تلين وتسقط من القاعدة بسبب الريّ الزائد؛ اسقِ كل 2-3 أسابيع فقط (شهريًا في الشتاء).`,`Cut healthy leaf sections and root them if the rhizome is rotten.`,`قصّ الأجزاء السليمة وجذّرها إن تعفّن الجذمور.`]},
zz:{yellow:[`ZZ yellowing is nearly always overwatering: its fat rhizomes store water, so water only when fully dry (every 3-4 weeks).`,`اصفرار الزاميا هو غالبًا ريّ زائد: جذاميره السميكة تخزّن الماء فاسقِ عند الجفاف التام فقط (كل 3-4 أسابيع).`,`Unpot and check the rhizomes; firm and white is healthy.`,`أخرجه وافحص الجذامير؛ الصلبة البيضاء سليمة.`]},
aloe:{redpurple:[`Aloe turning orange or red-brown from strong sun or drought is harmless; thin, bending leaves mean too little light.`,`تحوّل الألوفيرا إلى البرتقالي أو البني المحمر من شمس قوية أو عطش غير ضار؛ والأوراق الرفيعة المنحنية تعني ضوءًا قليلًا.`,`Give bright light and water deeply only when the soil is dry.`,`أعطِها ضوءًا ساطعًا واسقِ بعمق عند جفاف التربة فقط.`]},
cactus:{mushy:[`A soft, dark cactus base is rot; in winter keep cacti almost dry and cool.`,`قاعدة الصبّار الطرية الداكنة تعفّن؛ في الشتاء أبقِ الصبّار شبه جاف وبارد.`,`Cut above the rot into clean green tissue and re-root the top.`,`اقطع فوق التعفن في نسيج أخضر نظيف وجذّر القمة.`]},
jade:{dropleaves:[`Jade drops wrinkled leaves when thirsty and plump, mushy leaves when overwatered.`,`شجرة اليشم تُسقط أوراقًا مجعدة عند العطش وأوراقًا ممتلئة طرية عند الريّ الزائد.`,`Check the leaf: wrinkled = water deeply; soft and translucent = hold off.`,`افحص الورقة: مجعدة = اسقِ بعمق؛ طرية شفافة = أوقف الريّ.`]},
orchid:{yellow:[`Orchid: one yellow bottom leaf now and then is normal. Silvery roots = thirsty, green = fine, brown and mushy = rot.`,`الأوركيد: ورقة سفلية صفراء من حين لآخر طبيعية. جذور فضية = عطش، خضراء = سليمة، بنية طرية = تعفّن.`,`Soak the pot for 10 minutes weekly and let it drain fully.`,`انقع الأصيص 10 دقائق أسبوعيًا ودعه يصرّف تمامًا.`],noflower:[`After flowering, a Phalaenopsis spike can be cut above the second node to rebloom; it still needs a cool night drop to start a new spike.`,`بعد الإزهار يمكن قصّ ساق الفالينوبسيس فوق العقدة الثانية ليعيد الإزهار؛ ويحتاج هبوطًا ليليًا في الحرارة لبدء ساق جديد.`,`Cut the spike above the second node, then give a cool night spell.`,`اقطع الساق فوق العقدة الثانية ثم أعطه ليالي أبرد.`]},
rose:{spots:[`Black spot on roses: black blotches with yellow halos that spread in humid weather.`,`البقعة السوداء في الورد: بقع سوداء بهالة صفراء تنتشر في الجو الرطب.`,`Remove fallen leaves and spray sulfur or copper at the first sign.`,`أزل الأوراق المتساقطة ورشّ كبريتًا أو نحاسًا عند أول علامة.`],noflower:[`Roses flower on new growth: prune hard in January-February and feed after each flush of bloom.`,`الورد يزهر على النمو الجديد: قلّم بقوة في كانون الثاني وشباط وسمّد بعد كل موجة إزهار.`,`Give 6+ hours of sun and a potash-rich feed.`,`أعطه 6 ساعات شمس فأكثر وسمادًا غنيًا بالبوتاس.`]},
damask:{noflower:[`Damask roses bloom once, in spring (April-May); do not expect repeat flowering.`,`الورد الجوري الدمشقي يزهر مرة واحدة في الربيع (نيسان-أيار)؛ لا تنتظر إزهارًا متكررًا.`,`Prune lightly right after its spring flush.`,`قلّم بخفة بعد موجة الربيع مباشرة.`]},
arabjasmine:{noflower:[`Arabian jasmine (Fil) blooms in warm months on new growth, and needs full sun and regular feeding.`,`الفل يزهر في الأشهر الدافئة على النمو الجديد ويحتاج شمسًا كاملة وتسميدًا منتظمًا.`,`Feed every 2 weeks in summer and pinch tips to branch.`,`سمّد كل أسبوعين صيفًا واقرص القمم للتفريع.`]},
jasmine:{noflower:[`Damascus jasmine blooms from late winter to spring on last year's wood; pruning at the wrong time removes the buds.`,`الياسمين الشامي يزهر من أواخر الشتاء إلى الربيع على خشب العام الماضي؛ والتقليم في وقت خاطئ يزيل البراعم.`,`Prune right after flowering and give a trellis and full sun.`,`قلّم بعد الإزهار مباشرة وأعطه دعامة وشمسًا كاملة.`]},
lavender:{mushy:[`Lavender rots in rich, wet soil: it wants lean, gritty, alkaline soil and little water.`,`اللافندر يتعفن في التربة الغنية المبتلة: يريد تربة فقيرة خشنة قلوية وماءً قليلًا.`,`Replant in sandy soil with grit and water only when dry.`,`أعد زراعته في تربة رملية خشنة واسقِ عند الجفاف فقط.`]},
rosemary:{droop:[`Rosemary dies suddenly if its roots stay wet in summer, or if it dries out in a small pot.`,`الروزماري يموت فجأة إن بقيت جذوره مبتلة صيفًا أو جفّ في أصيص صغير.`,`Use sandy soil, a big pot and water when the top 3 cm are dry.`,`استخدم تربة رملية وأصيصًا كبيرًا واسقِ عند جفاف أول 3 سم.`]},
basil:{yellow:[`Basil yellows and blackens below 12°C, and with fusarium or downy mildew; it is a warm-season plant.`,`الريحان يصفرّ ويسودّ تحت 12°م ومع الفيوزاريوم أو البياض الزغبي؛ فهو نبات موسم دافئ.`,`Grow it in a warm sunny spot and pinch flower buds weekly.`,`ازرعه في مكان دافئ مشمس واقرص البراعم الزهرية أسبوعيًا.`]},
mint:{pests:[`Mint gets spider mites in dry heat and rust (orange pustules) in humid weather.`,`النعناع يُصاب بالعنكبوت الأحمر في الحر الجاف وبالصدأ (بثور برتقالية) في الجو الرطب.`,`Cut it back hard, bin the cuttings, and let fresh growth come.`,`قصّه بقوة وتخلّص من القصاصات ودع النمو الجديد يخرج.`]},
parsley:{yellow:[`Parsley yellows from wet feet, and in its second year it bolts and goes to seed.`,`البقدونس يصفرّ من الجذور المبتلة، وفي سنته الثانية يزهر ويبذر.`,`Replace second-year plants with fresh seedlings in autumn.`,`استبدل نباتات السنة الثانية بشتلات جديدة في الخريف.`]},
olive:{spots:[`Olive peacock spot: circular dark spots with yellow halos and leaf drop after wet weather.`,`عين الطاووس في الزيتون: بقع دائرية داكنة بهالة صفراء وتساقط الأوراق بعد الطقس الرطب.`,`Spray copper in autumn and early spring; prune to open the canopy.`,`رشّ نحاسًا في الخريف وبداية الربيع وقلّم لفتح التاج.`],noflower:[`Olives crop in alternate years (biennial bearing); heavy nitrogen and wrong pruning reduce flowers.`,`الزيتون يحمل بالتناوب سنة بعد سنة؛ والنيتروجين الكثير والتقليم الخاطئ يقللان الأزهار.`,`Prune lightly in late winter and avoid heavy nitrogen.`,`قلّم بخفة في أواخر الشتاء وتجنّب النيتروجين الكثير.`],pests:[`Olive fruit fly and olive scale are the main pests: trap flies from July and treat scale in spring.`,`ذبابة ثمار الزيتون والحشرة القشرية أهم آفاته: صِد الذباب من تموز وعالج القشرية في الربيع.`,`Hang yellow fly traps and spray summer oil on scale in spring.`,`علّق مصائد صفراء ورشّ زيتًا صيفيًا على القشرية في الربيع.`]},
lemon:{yellow:[`Lemon: yellow leaves with green veins mean iron or magnesium shortage, especially in alkaline soil and with hard water.`,`الليمون: أوراق صفراء بعروق خضراء تعني نقص الحديد أو المغنيسيوم خاصة في التربة القلوية والماء العسر.`,`Use a citrus fertiliser with chelated iron and magnesium every 6 weeks.`,`استخدم سماد حمضيات بحديد مخلّبي ومغنيسيوم كل 6 أسابيع.`],dropleaves:[`Lemons drop leaves after cold nights, dry spells or wind; below 2°C protect with fleece.`,`الليمون يُسقط أوراقه بعد الليالي الباردة أو فترات الجفاف أو الريح؛ وحمايته بقماش واقٍ لازمة تحت 2°م.`,`Water deeply and mulch the roots; cover on frost nights.`,`اسقِ بعمق وضع نشارة على الجذور وغطّه في ليالي الصقيع.`]},
tomato:{fruit:[`Blossom-end rot (black sunken base) comes from uneven watering, not a lack of calcium in the soil.`,`عفن الطرف الزهري (قاعدة سوداء غائرة) سببه ريّ غير منتظم لا نقص كالسيوم في التربة.`,`Mulch heavily and water deeply every 2-3 days instead of often and little.`,`ضع نشارة كثيفة واسقِ بعمق كل 2-3 أيام بدل الريّ القليل المتكرر.`],curl:[`Leaves curling upward in heat is common and harmless; curling with yellow mosaic or stunting is a whitefly-borne virus (TYLCV).`,`التفاف الأوراق للأعلى في الحر شائع وغير ضار؛ أما الالتفاف مع تبرقش أصفر وقزامة فهو فيروس تنقله الذبابة البيضاء (TYLCV).`,`Remove virus-infected plants, use insect net and yellow traps.`,`أزل النباتات المصابة بالفيروس واستخدم شبك حشرات ومصائد صفراء.`],noflower:[`Tomato flowers drop when days are above 35°C or nights above 24°C or below 10°C.`,`تسقط أزهار الطماطم عندما يتجاوز النهار 35°م أو الليل 24°م أو ينخفض عن 10°م.`,`Shade net at midday and shake the flower trusses gently in the morning.`,`استخدم شبك تظليل وقت الظهيرة وهزّ عناقيد الأزهار برفق صباحًا.`]},
cherrytomato:{fruit:[`Cherry tomatoes split after sudden heavy watering following a dry spell.`,`تتشقق الطماطم الكرزية بعد ريّ غزير مفاجئ يلي فترة جفاف.`,`Keep the soil evenly moist and pick fruit as soon as it colours.`,`أبقِ التربة رطبة بانتظام واقطف الثمار حال تلوّنها.`]},
cucumber:{powder:[`Cucumbers get powdery mildew from midsummer; it spreads fast on crowded vines.`,`يُصاب الخيار بالبياض الدقيقي من منتصف الصيف وينتشر بسرعة على العرائش المزدحمة.`,`Spray milk 1:9 or sulfur weekly and train vines up a trellis.`,`رشّ حليبًا 1:9 أو كبريتًا أسبوعيًا وربّ العرائش على دعامة.`],fruit:[`Bitter or curled cucumbers come from water stress, heat and uneven watering.`,`الخيار المر أو الملتوي ينتج عن إجهاد مائي وحرّ وريّ غير منتظم.`,`Water deeply and regularly, and give light afternoon shade in heat waves.`,`اسقِ بعمق وبانتظام وأعطِ ظلًا خفيفًا بعد الظهر في موجات الحر.`]},
pepper:{noflower:[`Peppers drop flowers when nights are above 24°C or below 10°C, or when it is too windy and dry.`,`يُسقط الفلفل أزهاره عندما تتجاوز ليالي 24°م أو تقل عن 10°م أو مع الريح والجفاف.`,`Shade in heat waves, keep soil moist, and avoid excess nitrogen.`,`ظلّله في موجات الحر وأبقِ التربة رطبة وتجنّب النيتروجين الزائد.`]},
chili:{noflower:[`Chilli flowers drop in heat above 35°C or when water swings between dry and wet.`,`تسقط أزهار الفلفل الحار فوق 35°م أو عند تأرجح الريّ بين الجفاف والغمر.`,`Mulch, water regularly and give midday shade.`,`ضع نشارة واسقِ بانتظام وأعطِ ظلًا وقت الظهيرة.`]},
strawberry:{fruit:[`Strawberries rot where fruit touches wet soil; grey mould spreads in damp weather.`,`تتعفن الفراولة حيث تلامس التربة المبتلة؛ والعفن الرمادي ينتشر في الطقس الرطب.`,`Mulch with straw, water at the base in the morning and pick every 2 days.`,`ضع نشارة قش واسقِ عند القاعدة صباحًا واقطف كل يومين.`]},
fig:{fruit:[`Figs drop unripe fruit with drought or heavy rain; a milky sap and mild splitting are normal.`,`التين يُسقط الثمار غير الناضجة مع الجفاف أو المطر الغزير؛ والنسغ الحليبي والتشقق الخفيف طبيعيان.`,`Water deeply every 7-10 days in summer and avoid heavy nitrogen.`,`اسقِ بعمق كل 7-10 أيام صيفًا وتجنّب النيتروجين الكثير.`]},
pomegranate:{fruit:[`Pomegranates split when heavy watering follows a dry spell, usually just before ripening.`,`يتشقق الرمان عندما يتبع الجفاف ريّ غزير، وغالبًا قبل النضج بقليل.`,`Keep watering steady through ripening and pick slightly early if rain is coming.`,`حافظ على ريّ ثابت أثناء النضج واقطف مبكرًا قليلًا إن كان المطر قادمًا.`]},
datepalm:{pests:[`Red palm weevil: wilting central fronds, chewing noises, fermenting smell and brown fibre at the crown. It can kill a palm within weeks.`,`سوسة النخيل الحمراء: ذبول السعف المركزي وأصوات قضم ورائحة تخمّر وألياف بنية عند القمة. قد تقتل النخلة خلال أسابيع.`,`Report it to the agriculture authority at once and avoid pruning in summer, which attracts the weevil.`,`أبلغ جهة الزراعة فورًا وتجنّب التقليم صيفًا فهو يجذب السوسة.`]},
grape:{powder:[`Powdery mildew is the main grape disease in dry-summer climates; infection starts at bud break.`,`البياض الدقيقي أهم أمراض العنب في المناخات الصيفية الجافة؛ وتبدأ العدوى عند تفتح البراعم.`,`Dust or spray sulfur before bloom and every 10-14 days, and keep the canopy open.`,`رشّ كبريتًا قبل الإزهار وكل 10-14 يومًا وأبقِ التاج مفتوحًا.`]},
bougainvillea:{dropleaves:[`Bougainvillea drops leaves when it is cold, moved or overwatered; it blooms best with slightly dry roots.`,`الجهنمية تُسقط أوراقها في البرد أو عند النقل أو الريّ الزائد؛ وتزهر أفضل مع جذور جافة قليلًا.`,`Reduce water, keep it in full sun and protect it from frost.`,`قلّل الريّ وأبقِها في شمس كاملة واحمِها من الصقيع.`],noflower:[`Bougainvillea blooms under mild stress: too much water and nitrogen give leaves and no bracts.`,`الجهنمية تزهر مع إجهاد خفيف: الماء والنيتروجين الكثيران يعطيان أوراقًا بلا أزهار.`,`Water only when dry, stop nitrogen and give 6+ hours of sun.`,`اسقِ عند الجفاف فقط وأوقف النيتروجين وأعطها 6 ساعات شمس فأكثر.`]},
hibiscus:{dropleaves:[`Hibiscus drops buds after sudden changes, dry soil, thrips, or low potassium.`,`الخبازى تُسقط البراعم بعد تغيرات مفاجئة أو جفاف التربة أو الثريبس أو نقص البوتاسيوم.`,`Keep water steady, check buds for thrips, and use a high-potassium feed.`,`حافظ على ريّ ثابت وافحص البراعم بحثًا عن الثريبس واستخدم سمادًا عالي البوتاسيوم.`]},
gardenia:{yellow:[`Gardenia yellows in alkaline water and soil (iron lock-up); it needs acidic soil, humidity and no moving while in bud.`,`الغاردينيا تصفرّ في الماء والتربة القلويين (حبس الحديد)؛ وتحتاج تربة حامضية ورطوبة وعدم النقل أثناء التبرعم.`,`Use rain or rested water, an acid fertiliser with iron, and keep it still.`,`استخدم ماء مطر أو مُرتاحًا وسمادًا حامضيًا بالحديد وثبّته في مكانه.`]},
calathea:{browntips:[`Calathea crisps at the edges from dry air, fluoride and tap-water salts.`,`الكالاثيا تتيبّس حوافها من الهواء الجاف والفلورايد وأملاح ماء الصنبور.`,`Use filtered or rain water and keep humidity above 50%.`,`استخدم ماءً مفلترًا أو ماء مطر وأبقِ الرطوبة فوق 50%.`],curl:[`Calathea leaves curl inward when thirsty or when the air is too dry.`,`أوراق الكالاثيا تلتف للداخل عند العطش أو جفاف الهواء.`,`Water as soon as the top 1-2 cm dry and group with other plants.`,`اسقِ حالما تجفّ أول 1-2 سم واجمعها مع نباتات أخرى.`]},
fern:{browntips:[`Boston fern fronds brown when the soil dries even once, and the dead fronds will not recover.`,`يبنّ سعف سرخس بوسطن إذا جفّت التربة ولو مرة واحدة ولا يتعافى السعف الميت.`,`Cut dead fronds to the base and keep soil constantly damp.`,`قصّ السعف الميت عند القاعدة وأبقِ التربة رطبة باستمرار.`]},
spider:{browntips:[`Spider plant tips brown from fluoride and salts in tap water; this is cosmetic.`,`تبنّ أطراف نبات العنكبوت من فلورايد وأملاح ماء الصنبور؛ وهذا تجميلي فقط.`,`Water with rain or filtered water and trim the tips.`,`اسقِه بماء مطر أو مفلتر وقصّ الأطراف.`]},
rubber:{dropleaves:[`Rubber plants drop lower leaves when light is low or soil stays soggy.`,`نبات المطاط يُسقط أوراقه السفلية عند قلة الضوء أو بقاء التربة مشبعة.`,`Move closer to a bright window and water when the top 5 cm are dry.`,`انقله قرب نافذة مشرقة واسقِ عند جفاف أول 5 سم.`]},
ivy:{pests:[`Ivy is a spider-mite magnet in dry indoor air, shown by fine webbing and dull, speckled leaves.`,`اللبلاب جاذب للعنكبوت الأحمر في الهواء الداخلي الجاف، وتظهر خيوط دقيقة وأوراق باهتة منقطة.`,`Shower it monthly and mist or raise humidity.`,`اغسله بالدش شهريًا وارفع الرطوبة.`]},
luckybamboo:{yellow:[`Lucky bamboo yellows from chlorine and fluoride in tap water or from direct sun; a fully yellow stalk is dying.`,`خيزران الحظ يصفرّ من كلور وفلورايد ماء الصنبور أو من الشمس المباشرة؛ والساق الصفراء بالكامل تحتضر.`,`Change the water weekly with filtered water and remove yellow stalks.`,`بدّل الماء أسبوعيًا بماء مفلتر وأزل السيقان الصفراء.`]},
poinsettia:{dropleaves:[`Poinsettia drops leaves from cold draughts or overwatering; red bracts need 14 hours of dark each night from October.`,`بونسيتيا تُسقط أوراقها من تيارات البرد أو الريّ الزائد؛ والأوراق الحمراء تحتاج 14 ساعة ظلام ليلًا من تشرين الأول.`,`Keep it above 15°C away from windows and let the top 2 cm dry.`,`أبقِها فوق 15°م بعيدًا عن النوافذ ودع أول 2 سم تجفّ.`]},
cyclamen:{yellow:[`Cyclamen yellows when too warm (above 20°C) or watered over the leaves; it naturally rests in summer.`,`السيكلامين يصفرّ عند الدفء الزائد (فوق 20°م) أو الريّ على الأوراق؛ ويرتاح صيفًا بشكل طبيعي.`,`Keep it at 10-15°C, water into the saucer and rest the tuber dry in summer.`,`أبقِه عند 10-15°م واسقِ من الصحن وأرح الدرنة جافة صيفًا.`]},
africanviolet:{spots:[`African violet gets pale ring spots when cold water touches the leaves.`,`البنفسج الأفريقي يُصاب ببقع حلقية شاحبة عندما يلامس الماء البارد الأوراق.`,`Water the soil with room-temperature water from below.`,`اسقِ التربة بماء بدرجة حرارة الغرفة من الأسفل.`]},
hydrangea:{droop:[`Hydrangeas wilt in afternoon sun but recover at night; the name means water-vessel.`,`الكوبية تذبل في شمس العصر وتنتعش ليلًا؛ فهي نبات عطِش.`,`Give morning sun, afternoon shade, and water often.`,`أعطِها شمس الصباح وظل العصر واسقِها كثيرًا.`]},
lettuce:{leggy:[`Lettuce bolts above 25°C: grow it from autumn to early spring in warm regions.`,`الخس يُزهر ويطول فوق 25°م: ازرعه من الخريف حتى بداية الربيع في المناطق الدافئة.`,`Sow successively every 2 weeks in cool months and shade it in warm spells.`,`ازرع كل أسبوعين في الأشهر الباردة وظلّله في الفترات الدافئة.`]},
potato:{spots:[`Potato late blight appears as dark, water-soaked blotches in cool, wet weather and can destroy a crop in days.`,`اللفحة المتأخرة في البطاطا تظهر كبقع داكنة مشبعة بالماء في الطقس البارد الرطب وقد تدمّر المحصول خلال أيام.`,`Remove infected tops, spray copper and never save tubers from infected plants.`,`أزل الأجزاء المصابة ورشّ نحاسًا ولا تحتفظ بدرنات من نباتات مصابة.`]},
avocado:{browntips:[`Avocado tip burn comes from salty irrigation water and soil that stays wet.`,`حرق أطراف الأفوكادو ناتج عن مياه ريّ مالحة وتربة تبقى رطبة.`,`Flush the soil monthly and use a well-draining mix.`,`اشطف التربة شهريًا واستخدم تربة جيدة التصريف.`]}
};

/* ---- engine ---- */
const KEYS=SY.map(x=>x[0]),SYM=Object.fromEntries(SY.map(x=>[x[0],{sev:x[1],en:x[2],ar:x[3],f:x[4]}]));
const ok=(tag,set)=>tag==='*'||tag.split('|').some(x=>set.has(x));
function tagSet(id,ctx){
  const g=P.grp[id]||'generic',t=new Set((G[g]||G.generic)[0].split(','));
  (P.xt[id]||'').split(',').filter(Boolean).forEach(x=>t.add(x));
  ctx=ctx||{};
  t.add(ctx.where==='out'?'out':'in');
  if(ctx.temp>=33||ctx.cond==='hot')t.add('heat');
  if(ctx.temp<=8||ctx.cond==='cold')t.add('chill');
  if(ctx.hum<30||ctx.cond==='dry')t.add('dryair');
  const m=ctx.month==null?new Date().getMonth():ctx.month;
  if(t.has('decid')&&(m>=9&&m<=11))t.add('autumn');
  return t;
}
function relevant(id,ctx){
  const t=tagSet(id,ctx);
  return KEYS.filter(k=>SYM[k].f==='*'||ok(SYM[k].f,t));
}
function diagnose(id,keys,ctx,lang){
  const L=lang==='ar'?3:2,t=tagSet(id,ctx),many=keys.length>2,nC=many?3:4,nS=many?3:5;
  const grp=G[P.grp[id]||'generic']||G.generic,ov=OV[id]||{};
  const pick=(k,kind,n)=>FR[k].filter(f=>f[0]===kind&&ok(f[1],t)).slice(0,n).map(f=>f[L]);
  const blocks=keys.map(k=>{
    const causes=[],steps=[];
    if(ov[k]){causes.push(ov[k][lang==='ar'?1:0]);steps.push(ov[k][lang==='ar'?3:2])}
    pick(k,'c',nC-causes.length).forEach(x=>causes.push(x));
    pick(k,'s',nS-steps.length).forEach(x=>steps.push(x));
    const pv=pick(k,'p',1)[0]||'';
    return{key:k,title:SYM[k][lang==='ar'?'ar':'en'],sev:SYM[k].sev,specific:!!ov[k],causes,steps,prev:pv};
  });
  return{tip:grp[lang==='ar'?2:1],blocks,sev:Math.max(0,...keys.map(k=>SYM[k].sev))};
}
P.care={G,SY,SYM,KEYS,relevant,diagnose,tagSet,hasOverride:(id,k)=>!!(OV[id]&&OV[id][k])};
})(window.PPX);

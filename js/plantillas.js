// ============================================================
//  plantillas.js · Biblioteca de plantillas de correo
//  6 fases × 8 idiomas. Tono gourmet/premium.
//  Variables disponibles: {empresa} {contacto} {miNombre} {miEmpresa}
//  Se rellenan con la ficha del cliente y la config del usuario.
// ============================================================

export const IDIOMAS = [
  { id:"es", label:"Español",  bandera:"🇪🇸" },
  { id:"en", label:"English",  bandera:"🇬🇧" },
  { id:"fr", label:"Français", bandera:"🇫🇷" },
  { id:"de", label:"Deutsch",  bandera:"🇩🇪" },
  { id:"it", label:"Italiano", bandera:"🇮🇹" },
  { id:"ko", label:"한국어",     bandera:"🇰🇷" },
  { id:"ja", label:"日本語",     bandera:"🇯🇵" },
  { id:"zh", label:"中文",       bandera:"🇨🇳" }
];

export const FASES = [
  { id:"presentacion", label:"Presentación / primer contacto" },
  { id:"catalogo",     label:"Envío de catálogo" },
  { id:"precios",      label:"Precios / oferta" },
  { id:"muestras",     label:"Envío de muestras" },
  { id:"seguimiento",  label:"Seguimiento" },
  { id:"cierre",       label:"Agradecimiento / cierre" }
];

// Estructura: PLANTILLAS[fase][idioma] = { asunto, cuerpo }
export const PLANTILLAS = {
  // ---------------- PRESENTACIÓN ----------------
  presentacion:{
    es:{ asunto:"Aceite de oliva virgen extra gourmet del Bajo Aragón — {empresa}",
      cuerpo:`Estimado/a {contacto}:

Me pongo en contacto con {empresa} en nombre de {miEmpresa}, distribuidor oficial autorizado de la Cooperativa Oleícola de Valdealgorfa (Bajo Aragón, Teruel).

Elaboramos aceite de oliva virgen extra de gama alta a partir de olivos centenarios, con recolección temprana, extracción en frío y una acidez inferior al 0,14 %. Es un producto de producción limitada, no industrial, premiado internacionalmente (IOOC EVO 2025) y orientado a tiendas gourmet, restauración de autor, importadores y distribuidores que valoran la calidad y el origen.

Me encantaría presentarles nuestras marcas y explorar una posible colaboración. ¿Tendría disponibilidad para una breve llamada esta semana?

Un cordial saludo,
{miNombre}
{miEmpresa}` },
    en:{ asunto:"Premium extra virgin olive oil from Bajo Aragón — {empresa}",
      cuerpo:`Dear {contacto},

I am reaching out to {empresa} on behalf of {miEmpresa}, the official authorized distributor of the Valdealgorfa Olive Oil Cooperative (Bajo Aragón, Spain).

We produce high-end extra virgin olive oil from centuries-old olive trees, with early harvest, cold extraction and an acidity below 0.14%. It is a limited, non-industrial production, internationally awarded (IOOC EVO 2025), aimed at gourmet shops, fine dining, importers and distributors who value quality and origin.

I would be delighted to introduce our brands and explore a possible collaboration. Would you have time for a short call this week?

Kind regards,
{miNombre}
{miEmpresa}` },
    fr:{ asunto:"Huile d'olive vierge extra gourmet du Bajo Aragón — {empresa}",
      cuerpo:`Cher/Chère {contacto},

Je contacte {empresa} au nom de {miEmpresa}, distributeur officiel agréé de la Coopérative oléicole de Valdealgorfa (Bajo Aragón, Espagne).

Nous élaborons une huile d'olive vierge extra haut de gamme issue d'oliviers centenaires, avec récolte précoce, extraction à froid et une acidité inférieure à 0,14 %. C'est une production limitée, non industrielle, primée à l'international (IOOC EVO 2025), destinée aux épiceries fines, à la restauration gastronomique, aux importateurs et distributeurs attachés à la qualité et à l'origine.

Je serais ravi(e) de vous présenter nos marques et d'explorer une éventuelle collaboration. Auriez-vous un moment pour un bref échange cette semaine ?

Cordialement,
{miNombre}
{miEmpresa}` },
    de:{ asunto:"Premium natives Olivenöl extra aus Bajo Aragón — {empresa}",
      cuerpo:`Sehr geehrte/r {contacto},

ich wende mich im Namen von {miEmpresa} an {empresa}. Wir sind der offizielle autorisierte Vertrieb der Olivenöl-Genossenschaft Valdealgorfa (Bajo Aragón, Spanien).

Wir stellen hochwertiges natives Olivenöl extra aus jahrhundertealten Olivenbäumen her – mit früher Ernte, Kaltextraktion und einem Säuregehalt unter 0,14 %. Es ist eine limitierte, nicht industrielle Produktion, international ausgezeichnet (IOOC EVO 2025), für Feinkostgeschäfte, gehobene Gastronomie, Importeure und Händler, die Qualität und Herkunft schätzen.

Gerne würde ich Ihnen unsere Marken vorstellen und eine mögliche Zusammenarbeit besprechen. Hätten Sie diese Woche Zeit für ein kurzes Telefonat?

Mit freundlichen Grüßen,
{miNombre}
{miEmpresa}` },
    it:{ asunto:"Olio extravergine di oliva gourmet del Bajo Aragón — {empresa}",
      cuerpo:`Gentile {contacto},

contatto {empresa} per conto di {miEmpresa}, distributore ufficiale autorizzato della Cooperativa Olearia di Valdealgorfa (Bajo Aragón, Spagna).

Produciamo olio extravergine di oliva di alta gamma da olivi secolari, con raccolta precoce, estrazione a freddo e un'acidità inferiore allo 0,14%. È una produzione limitata, non industriale, premiata a livello internazionale (IOOC EVO 2025), pensata per gastronomie, ristorazione d'autore, importatori e distributori che valorizzano qualità e origine.

Sarei lieto/a di presentarvi i nostri marchi e di valutare una possibile collaborazione. Avrebbe tempo per una breve chiamata questa settimana?

Cordiali saluti,
{miNombre}
{miEmpresa}` },
    ko:{ asunto:"스페인 바호 아라곤 프리미엄 엑스트라 버진 올리브유 — {empresa}",
      cuerpo:`{contacto}님께,

저는 발데알고르파 올리브유 협동조합(스페인 바호 아라곤)의 공식 인증 유통사인 {miEmpresa}를 대표하여 {empresa}에 연락드립니다.

저희는 수백 년 된 올리브 나무에서 조기 수확하여 냉압착 방식으로 생산한 프리미엄 엑스트라 버진 올리브유를 만들며, 산도는 0.14% 미만입니다. 한정 생산되는 비산업적 제품으로 국제 대회(IOOC EVO 2025)에서 수상하였으며, 품질과 원산지를 중시하는 고급 식료품점, 파인다이닝, 수입업체 및 유통업체를 위한 제품입니다.

저희 브랜드를 소개하고 협력 가능성을 논의드리고 싶습니다. 이번 주 중 잠시 통화 가능하신 시간이 있으실까요?

감사합니다.
{miNombre}
{miEmpresa}` },
    ja:{ asunto:"スペイン・バホアラゴン産プレミアム エクストラバージン オリーブオイル — {empresa}",
      cuerpo:`{contacto} 様

バルデアルゴルファ オリーブオイル協同組合（スペイン・バホアラゴン）の正規認定販売代理店である {miEmpresa} を代表し、{empresa} 様にご連絡を差し上げております。

当社は、樹齢数百年のオリーブの木から早期収穫し、低温抽出した高級エクストラバージンオリーブオイルを生産しており、酸度は0.14%未満です。限定生産の非工業的製品で、国際大会（IOOC EVO 2025）にて受賞しており、品質と産地を重視する高級食材店、ファインダイニング、輸入業者および流通業者向けの商品です。

ぜひ当社のブランドをご紹介し、協業の可能性についてご相談できればと存じます。今週、短いお電話のお時間をいただけますでしょうか。

何卒よろしくお願い申し上げます。
{miNombre}
{miEmpresa}` },
    zh:{ asunto:"西班牙下阿拉贡高端特级初榨橄榄油 — {empresa}",
      cuerpo:`尊敬的 {contacto}：

我谨代表 {miEmpresa} 与贵公司 {empresa} 联系。我们是巴尔德阿尔戈法橄榄油合作社（西班牙下阿拉贡）的官方授权经销商。

我们采用百年橄榄树早期采摘、冷压提取，生产高端特级初榨橄榄油，酸度低于0.14%。这是一款限量、非工业化生产的产品，曾获国际大奖（IOOC EVO 2025），面向重视品质与产地的高端食品店、高级餐饮、进口商及经销商。

我很乐意向您介绍我们的品牌并探讨合作的可能性。您本周是否有时间进行简短通话？

此致敬礼
{miNombre}
{miEmpresa}` }
  },

  // ---------------- CATÁLOGO ----------------
  catalogo:{
    es:{ asunto:"Catálogo y referencias — Aceite Aragón para {empresa}",
      cuerpo:`Estimado/a {contacto}:

Como continuación a nuestro contacto, le adjunto nuestro catálogo con la gama completa.

Trabajamos tres marcas de aceite de oliva virgen extra del Bajo Aragón (DOP): Palacio Andilla 1624 (monovarietales Arbequina, Empeltre DOP, Arbosana y Koroneiki, en 500 ml, 250 ml y estuche degustación 4×250 ml), Antonio Pérez 1631 (coupage exclusivo, 500 ml) y Valdealgorfa (monovarietales, 500 ml). Todos con acidez inferior al 0,14 % y recolección temprana.

Quedo a su disposición para enviarle información de las referencias que más le interesen.

Un cordial saludo,
{miNombre}
{miEmpresa}` },
    en:{ asunto:"Catalogue and references — Aceite Aragón for {empresa}",
      cuerpo:`Dear {contacto},

Following up on our conversation, please find attached our full catalogue.

We work with three extra virgin olive oil brands from Bajo Aragón (PDO): Palacio Andilla 1624 (single-variety Arbequina, Empeltre PDO, Arbosana and Koroneiki, in 500 ml, 250 ml and a 4×250 ml tasting pack), Antonio Pérez 1631 (exclusive blend, 500 ml) and Valdealgorfa (single-variety, 500 ml). All with acidity below 0.14% and early harvest.

I remain at your disposal to send details on the references that interest you most.

Kind regards,
{miNombre}
{miEmpresa}` },
    fr:{ asunto:"Catalogue et références — Aceite Aragón pour {empresa}",
      cuerpo:`Cher/Chère {contacto},

Pour faire suite à notre échange, veuillez trouver ci-joint notre catalogue complet.

Nous travaillons trois marques d'huile d'olive vierge extra du Bajo Aragón (AOP) : Palacio Andilla 1624 (monovariétales Arbequina, Empeltre AOP, Arbosana et Koroneiki, en 500 ml, 250 ml et coffret dégustation 4×250 ml), Antonio Pérez 1631 (assemblage exclusif, 500 ml) et Valdealgorfa (monovariétales, 500 ml). Toutes avec une acidité inférieure à 0,14 % et récolte précoce.

Je reste à votre disposition pour vous envoyer les détails des références qui vous intéressent le plus.

Cordialement,
{miNombre}
{miEmpresa}` },
    de:{ asunto:"Katalog und Referenzen — Aceite Aragón für {empresa}",
      cuerpo:`Sehr geehrte/r {contacto},

anknüpfend an unser Gespräch sende ich Ihnen anbei unseren vollständigen Katalog.

Wir führen drei Marken nativen Olivenöls extra aus Bajo Aragón (g.U.): Palacio Andilla 1624 (sortenrein Arbequina, Empeltre g.U., Arbosana und Koroneiki, in 500 ml, 250 ml und Verkostungsset 4×250 ml), Antonio Pérez 1631 (exklusive Cuvée, 500 ml) und Valdealgorfa (sortenrein, 500 ml). Alle mit einem Säuregehalt unter 0,14 % und früher Ernte.

Gerne sende ich Ihnen weitere Informationen zu den Referenzen, die Sie am meisten interessieren.

Mit freundlichen Grüßen,
{miNombre}
{miEmpresa}` },
    it:{ asunto:"Catalogo e referenze — Aceite Aragón per {empresa}",
      cuerpo:`Gentile {contacto},

a seguito del nostro contatto, le invio in allegato il nostro catalogo completo.

Trattiamo tre marchi di olio extravergine di oliva del Bajo Aragón (DOP): Palacio Andilla 1624 (monovarietali Arbequina, Empeltre DOP, Arbosana e Koroneiki, in 500 ml, 250 ml e cofanetto degustazione 4×250 ml), Antonio Pérez 1631 (blend esclusivo, 500 ml) e Valdealgorfa (monovarietali, 500 ml). Tutti con acidità inferiore allo 0,14% e raccolta precoce.

Resto a disposizione per inviarle i dettagli delle referenze di maggiore interesse.

Cordiali saluti,
{miNombre}
{miEmpresa}` },
    ko:{ asunto:"카탈로그 및 제품 안내 — {empresa}를 위한 Aceite Aragón",
      cuerpo:`{contacto}님께,

지난 연락에 이어, 전체 제품 카탈로그를 첨부하여 보내드립니다.

저희는 바호 아라곤(원산지보호명칭 DOP)의 엑스트라 버진 올리브유 세 가지 브랜드를 취급합니다: Palacio Andilla 1624(단일 품종 Arbequina, Empeltre DOP, Arbosana, Koroneiki — 500ml, 250ml 및 4×250ml 테이스팅 세트), Antonio Pérez 1631(독점 블렌드, 500ml), Valdealgorfa(단일 품종, 500ml). 모두 산도 0.14% 미만, 조기 수확 제품입니다.

가장 관심 있으신 제품에 대한 상세 정보를 보내드릴 수 있도록 언제든 연락 주십시오.

감사합니다.
{miNombre}
{miEmpresa}` },
    ja:{ asunto:"カタログおよび製品のご案内 — {empresa} 様へ Aceite Aragón",
      cuerpo:`{contacto} 様

先のご連絡に続きまして、全製品カタログを添付いたします。

当社はバホアラゴン産（原産地呼称保護 DOP）のエクストラバージンオリーブオイルを3ブランド取り扱っております。Palacio Andilla 1624（単一品種 Arbequina、Empeltre DOP、Arbosana、Koroneiki — 500ml、250ml、4×250ml テイスティングセット）、Antonio Pérez 1631（限定ブレンド、500ml）、Valdealgorfa（単一品種、500ml）。いずれも酸度0.14%未満、早期収穫の製品です。

ご関心のある製品の詳細をお送りいたしますので、お気軽にお申し付けください。

何卒よろしくお願い申し上げます。
{miNombre}
{miEmpresa}` },
    zh:{ asunto:"产品目录与参考 — 致 {empresa} 的 Aceite Aragón",
      cuerpo:`尊敬的 {contacto}：

承接此前的联系，现随附我们的完整产品目录。

我们经营三个来自下阿拉贡（原产地保护 DOP）的特级初榨橄榄油品牌：Palacio Andilla 1624（单一品种 Arbequina、Empeltre DOP、Arbosana、Koroneiki，规格 500ml、250ml 及 4×250ml 品鉴套装）、Antonio Pérez 1631（独家调配，500ml）以及 Valdealgorfa（单一品种，500ml）。全部酸度低于0.14%，早期采摘。

如您对某些产品有兴趣，我很乐意为您提供更详细的资料。

此致敬礼
{miNombre}
{miEmpresa}` }
  },

  // ---------------- PRECIOS ----------------
  precios:{
    es:{ asunto:"Propuesta de precios — Aceite Aragón / {empresa}",
      cuerpo:`Estimado/a {contacto}:

Gracias por su interés. Le envío nuestra propuesta de precios para {empresa}.

[Indique aquí referencias, formatos y precios acordados]

Como distribuidor oficial, garantizamos precios alineados con el origen, trazabilidad completa y un suministro estable. Podemos adaptar la propuesta al volumen y a las condiciones logísticas que mejor le convengan (Incoterm, plazos, etc.).

Quedo a su disposición para cualquier ajuste.

Un cordial saludo,
{miNombre}
{miEmpresa}` },
    en:{ asunto:"Price proposal — Aceite Aragón / {empresa}",
      cuerpo:`Dear {contacto},

Thank you for your interest. Please find our price proposal for {empresa}.

[List references, formats and agreed prices here]

As the official distributor, we guarantee origin-aligned pricing, full traceability and stable supply. We can tailor the proposal to the volume and logistics terms that suit you best (Incoterm, lead times, etc.).

I remain at your disposal for any adjustment.

Kind regards,
{miNombre}
{miEmpresa}` },
    fr:{ asunto:"Proposition de prix — Aceite Aragón / {empresa}",
      cuerpo:`Cher/Chère {contacto},

Merci de votre intérêt. Veuillez trouver notre proposition de prix pour {empresa}.

[Indiquez ici les références, formats et prix convenus]

En tant que distributeur officiel, nous garantissons des prix alignés sur l'origine, une traçabilité complète et un approvisionnement stable. Nous pouvons adapter la proposition au volume et aux conditions logistiques qui vous conviennent (Incoterm, délais, etc.).

Je reste à votre disposition pour tout ajustement.

Cordialement,
{miNombre}
{miEmpresa}` },
    de:{ asunto:"Preisvorschlag — Aceite Aragón / {empresa}",
      cuerpo:`Sehr geehrte/r {contacto},

vielen Dank für Ihr Interesse. Anbei unser Preisvorschlag für {empresa}.

[Hier Referenzen, Formate und vereinbarte Preise angeben]

Als offizieller Vertrieb garantieren wir herkunftsbezogene Preise, vollständige Rückverfolgbarkeit und eine stabile Versorgung. Wir können das Angebot an das Volumen und die für Sie passenden Logistikbedingungen anpassen (Incoterm, Lieferzeiten usw.).

Für Anpassungen stehe ich Ihnen gerne zur Verfügung.

Mit freundlichen Grüßen,
{miNombre}
{miEmpresa}` },
    it:{ asunto:"Proposta di prezzi — Aceite Aragón / {empresa}",
      cuerpo:`Gentile {contacto},

grazie per l'interesse dimostrato. Le invio la nostra proposta di prezzi per {empresa}.

[Inserire qui referenze, formati e prezzi concordati]

In qualità di distributore ufficiale, garantiamo prezzi allineati all'origine, tracciabilità completa e fornitura stabile. Possiamo adattare la proposta al volume e alle condizioni logistiche a lei più convenienti (Incoterm, tempi, ecc.).

Resto a disposizione per qualsiasi modifica.

Cordiali saluti,
{miNombre}
{miEmpresa}` },
    ko:{ asunto:"가격 제안 — Aceite Aragón / {empresa}",
      cuerpo:`{contacto}님께,

관심 가져 주셔서 감사합니다. {empresa}를 위한 가격 제안을 보내드립니다.

[여기에 제품, 규격 및 협의 가격을 기재하십시오]

공식 유통사로서 원산지에 부합하는 가격, 완전한 이력 추적 및 안정적인 공급을 보장합니다. 물량과 귀사에 가장 적합한 물류 조건(인코텀즈, 납기 등)에 맞추어 제안을 조정해 드릴 수 있습니다.

조정이 필요하시면 언제든 연락 주십시오.

감사합니다.
{miNombre}
{miEmpresa}` },
    ja:{ asunto:"価格のご提案 — Aceite Aragón / {empresa}",
      cuerpo:`{contacto} 様

ご関心をお寄せいただきありがとうございます。{empresa} 様向けの価格のご提案をお送りいたします。

[ここに製品・規格・合意価格をご記入ください]

正規代理店として、産地に即した価格、完全なトレーサビリティ、安定供給を保証いたします。数量やご都合に合わせた物流条件（インコタームズ、納期など）に応じてご提案を調整可能です。

ご調整が必要な際は、お気軽にお申し付けください。

何卒よろしくお願い申し上げます。
{miNombre}
{miEmpresa}` },
    zh:{ asunto:"价格方案 — Aceite Aragón / {empresa}",
      cuerpo:`尊敬的 {contacto}：

感谢您的关注。现将致 {empresa} 的价格方案发送给您。

[请在此处列出产品、规格及商定价格]

作为官方经销商，我们保证价格与产地一致、全程可追溯并稳定供货。我们可根据数量及最适合您的物流条件（贸易术语、交货期等）调整方案。

如需任何调整，我随时为您服务。

此致敬礼
{miNombre}
{miEmpresa}` }
  },

  // ---------------- MUESTRAS ----------------
  muestras:{
    es:{ asunto:"Envío de muestras — Aceite Aragón para {empresa}",
      cuerpo:`Estimado/a {contacto}:

Con mucho gusto le prepararemos una selección de muestras para que pueda apreciar la calidad de nuestros aceites.

Confírmeme la dirección de envío y las referencias que desea catar (por ejemplo, monovarietales Arbequina o Empeltre DOP), y nos encargamos del resto. Estoy convencido/a de que la frescura y el perfil de nuestros aceites hablarán por sí solos.

Un cordial saludo,
{miNombre}
{miEmpresa}` },
    en:{ asunto:"Samples — Aceite Aragón for {empresa}",
      cuerpo:`Dear {contacto},

We would be glad to prepare a selection of samples so you can appreciate the quality of our oils.

Please confirm the shipping address and the references you would like to taste (for example, single-variety Arbequina or Empeltre PDO), and we will take care of the rest. I am confident the freshness and profile of our oils will speak for themselves.

Kind regards,
{miNombre}
{miEmpresa}` },
    fr:{ asunto:"Envoi d'échantillons — Aceite Aragón pour {empresa}",
      cuerpo:`Cher/Chère {contacto},

Nous serons ravis de préparer une sélection d'échantillons afin que vous puissiez apprécier la qualité de nos huiles.

Merci de me confirmer l'adresse d'envoi et les références que vous souhaitez déguster (par exemple, monovariétales Arbequina ou Empeltre AOP), et nous nous occupons du reste. Je suis convaincu(e) que la fraîcheur et le profil de nos huiles parleront d'eux-mêmes.

Cordialement,
{miNombre}
{miEmpresa}` },
    de:{ asunto:"Muster — Aceite Aragón für {empresa}",
      cuerpo:`Sehr geehrte/r {contacto},

gerne stellen wir Ihnen eine Auswahl an Mustern zusammen, damit Sie die Qualität unserer Öle selbst beurteilen können.

Bitte bestätigen Sie mir die Lieferadresse und die Referenzen, die Sie verkosten möchten (zum Beispiel sortenrein Arbequina oder Empeltre g.U.), den Rest übernehmen wir. Ich bin überzeugt, dass die Frische und das Profil unserer Öle für sich sprechen.

Mit freundlichen Grüßen,
{miNombre}
{miEmpresa}` },
    it:{ asunto:"Invio di campioni — Aceite Aragón per {empresa}",
      cuerpo:`Gentile {contacto},

saremo lieti di preparare una selezione di campioni affinché possa apprezzare la qualità dei nostri oli.

Mi confermi l'indirizzo di spedizione e le referenze che desidera degustare (ad esempio, monovarietali Arbequina o Empeltre DOP) e penseremo a tutto il resto. Sono convinto/a che la freschezza e il profilo dei nostri oli parleranno da soli.

Cordiali saluti,
{miNombre}
{miEmpresa}` },
    ko:{ asunto:"샘플 발송 — {empresa}를 위한 Aceite Aragón",
      cuerpo:`{contacto}님께,

저희 올리브유의 품질을 직접 확인하실 수 있도록 기꺼이 샘플 세트를 준비해 드리겠습니다.

배송 주소와 시음을 원하시는 제품(예: 단일 품종 Arbequina 또는 Empeltre DOP)을 알려 주시면 나머지는 저희가 준비하겠습니다. 저희 올리브유의 신선함과 풍미가 그 자체로 충분히 말해 줄 것이라 확신합니다.

감사합니다.
{miNombre}
{miEmpresa}` },
    ja:{ asunto:"サンプルのご送付 — {empresa} 様へ Aceite Aragón",
      cuerpo:`{contacto} 様

当社オリーブオイルの品質をご確認いただけるよう、喜んでサンプルのセットをご用意いたします。

お届け先のご住所と、ご試食をご希望の製品（例：単一品種 Arbequina または Empeltre DOP）をお知らせいただければ、あとは当社にてご手配いたします。当社オリーブオイルの新鮮さと風味が、それ自体で十分に語ってくれるものと確信しております。

何卒よろしくお願い申し上げます。
{miNombre}
{miEmpresa}` },
    zh:{ asunto:"样品寄送 — 致 {empresa} 的 Aceite Aragón",
      cuerpo:`尊敬的 {contacto}：

我们很乐意为您准备一组样品，让您亲自体会我们橄榄油的品质。

请确认收货地址以及您希望品鉴的产品（例如单一品种 Arbequina 或 Empeltre DOP），其余交由我们安排。我相信我们橄榄油的新鲜度与风味会不言自明。

此致敬礼
{miNombre}
{miEmpresa}` }
  },

  // ---------------- SEGUIMIENTO ----------------
  seguimiento:{
    es:{ asunto:"Seguimiento — Aceite Aragón / {empresa}",
      cuerpo:`Estimado/a {contacto}:

Quería retomar nuestro contacto y saber si ha tenido ocasión de revisar la información que le hice llegar.

Estaré encantado/a de resolver cualquier duda, enviarle muestras o ajustar una propuesta a las necesidades de {empresa}. Quedo a su disposición.

Un cordial saludo,
{miNombre}
{miEmpresa}` },
    en:{ asunto:"Following up — Aceite Aragón / {empresa}",
      cuerpo:`Dear {contacto},

I wanted to follow up and ask whether you had a chance to review the information I sent.

I would be glad to answer any questions, send samples, or tailor a proposal to {empresa}'s needs. I remain at your disposal.

Kind regards,
{miNombre}
{miEmpresa}` },
    fr:{ asunto:"Suivi — Aceite Aragón / {empresa}",
      cuerpo:`Cher/Chère {contacto},

Je souhaitais reprendre contact et savoir si vous avez eu l'occasion d'examiner les informations que je vous ai transmises.

Je serai ravi(e) de répondre à vos questions, de vous envoyer des échantillons ou d'adapter une proposition aux besoins de {empresa}. Je reste à votre disposition.

Cordialement,
{miNombre}
{miEmpresa}` },
    de:{ asunto:"Nachfassen — Aceite Aragón / {empresa}",
      cuerpo:`Sehr geehrte/r {contacto},

ich wollte an unser Gespräch anknüpfen und fragen, ob Sie Gelegenheit hatten, die zugesandten Informationen durchzusehen.

Gerne beantworte ich Ihre Fragen, sende Ihnen Muster oder passe ein Angebot an die Bedürfnisse von {empresa} an. Ich stehe Ihnen zur Verfügung.

Mit freundlichen Grüßen,
{miNombre}
{miEmpresa}` },
    it:{ asunto:"Follow-up — Aceite Aragón / {empresa}",
      cuerpo:`Gentile {contacto},

desideravo riprendere il contatto e sapere se ha avuto modo di esaminare le informazioni che le ho inviato.

Sarò lieto/a di rispondere a qualsiasi domanda, inviarle campioni o adattare una proposta alle esigenze di {empresa}. Resto a disposizione.

Cordiali saluti,
{miNombre}
{miEmpresa}` },
    ko:{ asunto:"후속 연락 — Aceite Aragón / {empresa}",
      cuerpo:`{contacto}님께,

지난번 보내드린 정보를 검토하실 기회가 있으셨는지 여쭙고자 다시 연락드립니다.

궁금하신 점에 대한 답변, 샘플 발송, 또는 {empresa}의 필요에 맞춘 제안 조정 등 무엇이든 기꺼이 도와드리겠습니다. 언제든 연락 주십시오.

감사합니다.
{miNombre}
{miEmpresa}` },
    ja:{ asunto:"フォローアップ — Aceite Aragón / {empresa}",
      cuerpo:`{contacto} 様

先般お送りした情報をご覧いただけましたでしょうか、改めてご連絡を差し上げました。

ご不明な点へのご回答、サンプルのご送付、また {empresa} 様のご要望に合わせたご提案の調整など、喜んで対応いたします。何なりとお申し付けください。

何卒よろしくお願い申し上げます。
{miNombre}
{miEmpresa}` },
    zh:{ asunto:"跟进 — Aceite Aragón / {empresa}",
      cuerpo:`尊敬的 {contacto}：

谨此跟进，想了解您是否已有机会查看我此前发送的资料。

无论是解答疑问、寄送样品，还是根据 {empresa} 的需求调整方案，我都很乐意效劳。随时听候您的吩咐。

此致敬礼
{miNombre}
{miEmpresa}` }
  },

  // ---------------- CIERRE / AGRADECIMIENTO ----------------
  cierre:{
    es:{ asunto:"Gracias — Aceite Aragón / {empresa}",
      cuerpo:`Estimado/a {contacto}:

Muchas gracias por su confianza en {miEmpresa}. Ha sido un placer cerrar este acuerdo con {empresa}.

Quedamos a su entera disposición para coordinar la logística y para acompañarle en todo lo que necesite. Estamos seguros de que nuestros aceites tendrán una excelente acogida.

Un cordial saludo,
{miNombre}
{miEmpresa}` },
    en:{ asunto:"Thank you — Aceite Aragón / {empresa}",
      cuerpo:`Dear {contacto},

Thank you very much for your trust in {miEmpresa}. It has been a pleasure to close this agreement with {empresa}.

We remain fully at your disposal to coordinate logistics and to support you in whatever you need. We are confident our oils will be very well received.

Kind regards,
{miNombre}
{miEmpresa}` },
    fr:{ asunto:"Merci — Aceite Aragón / {empresa}",
      cuerpo:`Cher/Chère {contacto},

Merci beaucoup de votre confiance envers {miEmpresa}. Ce fut un plaisir de conclure cet accord avec {empresa}.

Nous restons à votre entière disposition pour coordonner la logistique et vous accompagner dans tout ce dont vous aurez besoin. Nous sommes convaincus que nos huiles seront très bien accueillies.

Cordialement,
{miNombre}
{miEmpresa}` },
    de:{ asunto:"Vielen Dank — Aceite Aragón / {empresa}",
      cuerpo:`Sehr geehrte/r {contacto},

vielen Dank für Ihr Vertrauen in {miEmpresa}. Es war uns eine Freude, diese Vereinbarung mit {empresa} abzuschließen.

Wir stehen Ihnen für die Koordination der Logistik und bei allem, was Sie benötigen, voll zur Verfügung. Wir sind überzeugt, dass unsere Öle sehr gut ankommen werden.

Mit freundlichen Grüßen,
{miNombre}
{miEmpresa}` },
    it:{ asunto:"Grazie — Aceite Aragón / {empresa}",
      cuerpo:`Gentile {contacto},

grazie di cuore per la fiducia accordata a {miEmpresa}. È stato un piacere concludere questo accordo con {empresa}.

Restiamo a sua completa disposizione per coordinare la logistica e per assisterla in tutto ciò di cui avrà bisogno. Siamo certi che i nostri oli saranno accolti con grande favore.

Cordiali saluti,
{miNombre}
{miEmpresa}` },
    ko:{ asunto:"감사합니다 — Aceite Aragón / {empresa}",
      cuerpo:`{contacto}님께,

{miEmpresa}를 신뢰해 주셔서 진심으로 감사드립니다. {empresa}와 이번 계약을 체결하게 되어 매우 기쁩니다.

물류 조율을 비롯해 필요하신 모든 부분에서 최선을 다해 지원해 드리겠습니다. 저희 올리브유가 좋은 반응을 얻을 것이라 확신합니다.

감사합니다.
{miNombre}
{miEmpresa}` },
    ja:{ asunto:"御礼 — Aceite Aragón / {empresa}",
      cuerpo:`{contacto} 様

このたびは {miEmpresa} をご信頼いただき、誠にありがとうございます。{empresa} 様とご契約を締結できましたことを大変うれしく存じます。

物流の調整をはじめ、必要なことすべてにおいて全力でサポートいたします。当社オリーブオイルがご好評をいただけるものと確信しております。

何卒よろしくお願い申し上げます。
{miNombre}
{miEmpresa}` },
    zh:{ asunto:"感谢 — Aceite Aragón / {empresa}",
      cuerpo:`尊敬的 {contacto}：

衷心感谢您对 {miEmpresa} 的信任。很高兴与 {empresa} 达成此次合作。

我们将竭诚协助您协调物流并提供所需的一切支持。相信我们的橄榄油定会广受好评。

此致敬礼
{miNombre}
{miEmpresa}` }
  }
};

// Sustituye las variables {empresa} {contacto} {miNombre} {miEmpresa} por sus valores
export function rellenar(texto, cliente, config){
  return (texto||"")
    .replaceAll("{empresa}",  cliente.empresa || "")
    .replaceAll("{contacto}", cliente.contacto || (idiomaSaludo(cliente)) )
    .replaceAll("{miNombre}", config.miNombre || "")
    .replaceAll("{miEmpresa}",config.miEmpresa || "Aceite Aragón");
}
function idiomaSaludo(){ return ""; }

export function getPlantilla(fase, idioma){
  return (PLANTILLAS[fase] && PLANTILLAS[fase][idioma]) || null;
}

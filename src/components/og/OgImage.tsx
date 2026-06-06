interface OgImageProps {
  title: string;
  description: string;
  page: string;
  image?: string;
}

export function OgImage({title, description, page, image}: OgImageProps) {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#faf9f7',
        backgroundImage: 'linear-gradient(to bottom right, #faf9f7, #f2f1ee)',
        fontFamily: 'Inter, sans-serif',
        padding: 80,
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#faf9f7',
          borderRadius: 32,
          boxShadow: '0 8px 32px rgba(45,45,53,0.1)',
          overflow: 'hidden',
          height: 470,
        }}
      >
        <div
          style={{
            width: 8,
            backgroundColor: '#e88d67',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        />
        <div
          style={{
            flex: image ? '0 0 60%' : 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 48px',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#e88d67',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 900,
                color: '#ffffff',
                flexShrink: 0,
              }}
            >
              AD
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <span style={{fontSize: 15, fontWeight: 600, color: '#2d2d35'}}>
                Aaron Will Djaba
              </span>
              <span style={{fontSize: 12, color: '#8a8a8f'}}>
                iamaaronwilldjaba.me
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#e88d67',
                textTransform: 'uppercase',
                letterSpacing: 2,
              }}
            >
              {page}
            </span>
            <span
              style={{
                fontSize: image ? 34 : 48,
                fontWeight: 700,
                color: '#2d2d35',
                lineHeight: 1.15,
              }}
            >
              {title}
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: '#8a8a8f',
                lineHeight: 1.4,
              }}
            >
              {description}
            </span>
          </div>

          <div
            style={{
              width: 100,
              height: 2,
              backgroundColor: '#e8e7e3',
            }}
          />
        </div>

        {image && (
          <div
            style={{
              flex: '0 0 40%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 16px 16px 0',
              overflow: 'hidden',
            }}
          >
            <img
              src={image}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 16,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

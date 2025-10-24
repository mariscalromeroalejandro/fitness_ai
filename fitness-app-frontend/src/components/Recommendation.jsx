import { Typography } from "@mui/material";

export const Recommendation = ({ recommendation }) => (
  <div
    style={{
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    }}
  >
    {/* Main Recommendation */}
    {recommendation.recommendation && (
      <div
        style={{
          backgroundColor: '#f0f4ff',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '16px',
          borderLeft: '4px solid #1976d2',
        }}
      >
        <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
          📝 Recommendation
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#555', lineHeight: 1.6 }}
          whiteSpace="pre-line"
        >
          {recommendation.recommendation}
        </Typography>
      </div>
    )}

    {/* Improvements */}
    {recommendation.improvements?.length > 0 && (
      <div
        style={{
          backgroundColor: '#e8f4fd',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '16px',
          borderLeft: '4px solid #2196f3',
        }}
      >
        <Typography variant="h6" sx={{ color: '#1976d2', mb: 1 }}>
          💡 Improvements
        </Typography>
        {recommendation.improvements.map((imp, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{ mb: 1, color: '#333' }}
            whiteSpace="pre-line"
          >
            • {imp}
          </Typography>
        ))}
      </div>
    )}

    {/* Suggestions */}
    {recommendation.suggestions?.length > 0 && (
      <div
        style={{
          backgroundColor: '#e8fdf1',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '16px',
          borderLeft: '4px solid #2e7d32',
        }}
      >
        <Typography variant="h6" sx={{ color: '#2e7d32', mb: 1 }}>
          🏋️ Suggestions
        </Typography>
        {recommendation.suggestions.map((sug, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{ mb: 1, color: '#333' }}
            whiteSpace="pre-line"
          >
            • {sug}
          </Typography>
        ))}
      </div>
    )}

    {/* Safety */}
    {recommendation.safety?.length > 0 && (
      <div
        style={{
          backgroundColor: '#fff8e1',
          padding: '16px',
          borderRadius: '8px',
          borderLeft: '4px solid #ffb300',
        }}
      >
        <Typography variant="h6" sx={{ color: '#f57c00', mb: 1 }}>
          ⚠️ Safety
        </Typography>
        {recommendation.safety.map((saf, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{ mb: 1, color: '#333' }}
            whiteSpace="pre-line"
          >
            • {saf}
          </Typography>
        ))}
      </div>
    )}
  </div>
);

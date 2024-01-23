export const getTailwindClasses = (relevance: any) => {
    switch (relevance) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-red-500';
      case 'major':
        return 'bg-red-400';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-yellow-600';
      case 'minor':
        return 'bg-green-600';
      case 'trivial':
        return 'bg-green-500';
      case 'PENDING':
        return 'bg-blue-400';
      case 'PROGRESS':
        return 'bg-blue-600';
      case 'HOLD':
        return 'bg-violet-600';
      case 'CANCELLED':
        return 'bg-red-800';
      case 'COMPLETED':
        return 'bg-blue-700';
      case 'INITIATED':
        return 'bg-blue-500';
      default:
        return '';
    }
  };


export const capitalizeFirstLetter = (text:any) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
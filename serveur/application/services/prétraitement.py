"""
Preprocessing Service
NLP preprocessing utilities for query processing.
"""

import re
import nltk
from typing import List, Dict, Any
from ..core.logging import get_logger

logger = get_logger(__name__)

class TextPreprocessor:
    """
    Preprocesses natural language queries for better analysis.
    """

    def __init__(self):
        self.stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'if', 'while', 'at', 'by', 'for',
            'with', 'about', 'against', 'between', 'into', 'through', 'during',
            'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in',
            'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then',
            'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
            'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
            'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's',
            't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now',
            'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn',
            "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't",
            'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn',
            "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't",
            'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won',
            "won't", 'wouldn', "wouldn't"
        }

        # Business intelligence specific terms
        self.bi_terms = {
            'sales', 'revenue', 'profit', 'cost', 'expense', 'budget', 'forecast',
            'kpi', 'metric', 'dashboard', 'report', 'analysis', 'trend', 'growth',
            'performance', 'target', 'goal', 'average', 'total', 'sum', 'count',
            'maximum', 'minimum', 'percentage', 'ratio', 'comparison', 'ranking'
        }

    def preprocess_query(self, query: str) -> str:
        """
        Preprocess a natural language query.
        """
        # Convert to lowercase
        processed = query.lower()

        # Remove extra whitespace
        processed = re.sub(r'\s+', ' ', processed).strip()

        # Remove punctuation except for some meaningful ones
        processed = re.sub(r'[^\w\s\?\.\,\!\-\+\=\<\>]', '', processed)

        # Tokenize and remove stop words
        tokens = self._tokenize(processed)
        filtered_tokens = [token for token in tokens if token not in self.stop_words]

        # Rejoin tokens
        processed = ' '.join(filtered_tokens)

        logger.debug(f"Preprocessed query: '{query}' -> '{processed}'")
        return processed

    def extract_keywords(self, query: str) -> List[str]:
        """Extract important keywords from query."""
        processed = self.preprocess_query(query)
        tokens = self._tokenize(processed)

        # Prioritize BI terms and numbers
        keywords = []
        for token in tokens:
            if token in self.bi_terms or self._is_number(token):
                keywords.append(token)

        # Add remaining tokens if no BI terms found
        if not keywords:
            keywords = tokens[:5]  # Limit to first 5 tokens

        return keywords

    def identify_query_type(self, query: str) -> str:
        """Identify the type of query."""
        processed = query.lower()

        # Aggregation queries
        if any(word in processed for word in ['sum', 'total', 'average', 'avg', 'count', 'max', 'min']):
            return 'aggregation'

        # Comparison queries
        if any(word in processed for word in ['compare', 'comparison', 'vs', 'versus', 'difference']):
            return 'comparison'

        # Trend/Time series queries
        if any(word in processed for word in ['trend', 'over time', 'evolution', 'change', 'growth']):
            return 'temporal'

        # Filtering queries
        if any(word in processed for word in ['filter', 'where', 'having', 'with', 'by']):
            return 'filtering'

        # General queries
        return 'general'

    def extract_entities(self, query: str) -> Dict[str, List[str]]:
        """Extract entities like dates, numbers, regions from query."""
        entities = {
            'numbers': [],
            'dates': [],
            'regions': [],
            'metrics': []
        }

        # Extract numbers
        number_pattern = r'\b\d+(\.\d+)?\b'
        entities['numbers'] = re.findall(number_pattern, query)

        # Extract potential dates (simplified)
        date_pattern = r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b'
        entities['dates'] = re.findall(date_pattern, query)

        # Extract common regions (French regions for demo)
        regions = ['ile-de-france', 'provence', 'nouvelle-aquitaine', 'occitanie', 'auvergne']
        query_lower = query.lower()
        entities['regions'] = [region for region in regions if region in query_lower]

        # Extract metrics
        metrics = ['sales', 'revenue', 'profit', 'cost', 'budget']
        entities['metrics'] = [metric for metric in metrics if metric in query_lower]

        return entities

    def _tokenize(self, text: str) -> List[str]:
        """Simple tokenization."""
        # Split on whitespace and punctuation
        tokens = re.findall(r'\b\w+\b', text)
        return tokens

    def _is_number(self, token: str) -> bool:
        """Check if token is a number."""
        try:
            float(token)
            return True
        except ValueError:
            return False

def preprocess_query(query: str) -> str:
    """
    Convenience function for preprocessing queries.
    """
    preprocessor = TextPreprocessor()
    return preprocessor.preprocess_query(query)

def extract_query_keywords(query: str) -> List[str]:
    """
    Convenience function for extracting keywords.
    """
    preprocessor = TextPreprocessor()
    return preprocessor.extract_keywords(query)

def identify_query_intent(query: str) -> str:
    """
    Convenience function for identifying query type.
    """
    preprocessor = TextPreprocessor()
    return preprocessor.identify_query_type(query)
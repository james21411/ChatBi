import React from 'react';

export function ColorTest() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Blue Color Test</h3>

      <div className="space-y-4">
        {/* Test Tailwind blue classes */}
        <div className="bg-blue-500 text-white p-3 rounded">
          Tailwind blue-500: #3b82f6
        </div>

        <div className="bg-blue-600 text-white p-3 rounded">
          Tailwind blue-600: #2563eb
        </div>

        <div className="bg-blue-700 text-white p-3 rounded">
          Tailwind blue-700: #1d4ed8
        </div>

        <div className="bg-blue-800 text-white p-3 rounded">
          Tailwind blue-800: #1e40af
        </div>

        <div className="bg-blue-900 text-white p-3 rounded">
          Tailwind blue-900: #1e3a8a
        </div>

        {/* Test inline styles */}
        <div style={{backgroundColor: '#3b82f6', color: 'white', padding: '12px', borderRadius: '6px'}}>
          Inline style: #3b82f6
        </div>

        <div style={{backgroundColor: '#1d4ed8', color: 'white', padding: '12px', borderRadius: '6px'}}>
          Inline style: #1d4ed8
        </div>
      </div>

      <div className="mt-6 p-3 bg-gray-200 rounded">
        <p className="text-sm">If you can see blue boxes above with white text, Tailwind CSS is working correctly.</p>
        <p className="text-sm mt-2">If the boxes are not blue, there may be CSS conflicts or Tailwind is not properly loaded.</p>
      </div>
    </div>
  );
}
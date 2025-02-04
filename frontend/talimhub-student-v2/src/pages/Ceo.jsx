import React from 'react';

const CEO = () => {
  const teamMembers = [
    // {
    //   name: 'Ayubxon',
    //   role: 'CEO / Backend / Frontend dev',
    //   image: '/ayubxon.jpg',
    //   description: 'Platform founder and backend developer.',
    // }
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img
  src={member.image}
  alt={member.name}
  className="w-22 h-13 mx-auto mb-4"
/>

              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
              <p className="mt-4 text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CEO;

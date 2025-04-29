import Card from './components/Card';
import Header from './components/Header';
import Search from './components/Search';
import { members } from './member';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const filteredMembers = members.filter((member) => {
    // return member.name === search;
    return member.name.includes(search);
  })

  console.log(search);

  return (
    <>
      <Header />
      <Search search={search} handleSearchChange={handleSearch} />
      {/* 자식 컴포넌트인 Search에서 부모 컴포넌트의 값을 set할 수 있도록 handleSearch를 넘겨줌 */}
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {
          filteredMembers.map((member) => (
            <Card 
              key={member.id}
              name={member.name}
              github={member.github}
              englishName={member.englishName}
            />
          ))
        }
      </section>
    </>
  );
}

export default App;
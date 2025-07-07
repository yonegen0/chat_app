import React from 'react';
import { Autocomplete, TextField, ListItem, ListItemText, Box } from '@mui/material';

interface FilmOption {
  title: string;
  year: number;
}

const top100Films: FilmOption[] = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
];

export const StyledAutocomplete = () => {
// ユーザーがハイライトしているオプションを追跡するためのstate
  const [highlightedOption, setHighlightedOption] = React.useState<FilmOption | null>(null);

  const handleAutocompleteKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // 例: Enterキーが押された時に、現在ハイライトされているオプションをログに出力
    if (event.key === 'Enter') {
      console.log('Enter key pressed on Autocomplete input.');
      if (highlightedOption) {
        console.log('Highlighted option when Enter was pressed:', highlightedOption.title);
        // ここで選択されたオプションに対する追加のロジックを実行できます
        // event.defaultPrevented を確認して、MUIのデフォルト動作がキャンセルされていないことを確認することも重要です
      }
    }
    // 他のキーイベントもここで処理できます
    console.log('Key pressed on Autocomplete input:', event.key);
  };

  return (
    <Autocomplete<FilmOption>
      id="custom-render-option"
      sx={{ width: 300 }}
      options={top100Films}
      getOptionLabel={(option: FilmOption) => option.title}
      // Autocomplete 自体の onKeyDown を使用
      onKeyDown={handleAutocompleteKeyDown}
      // ハイライトされたオプションが変更されたときに状態を更新
      onHighlightChange={(event, option) => {
        setHighlightedOption(option);
        // console.log('Highlighted option changed:', option?.title);
      }}
      renderInput={(params) => <TextField {...params} label="映画を検索" />}
      renderOption={(props, option: FilmOption, state) => {
        const inputValue = state.inputValue.toLowerCase();
        const optionTitle = option.title.toLowerCase();
        const parts: { text: string; highlight: boolean }[] = [];

        if (inputValue && optionTitle.includes(inputValue)) {
          let lastIndex = 0;
          let matchIndex = optionTitle.indexOf(inputValue);

          while (matchIndex !== -1) {
            if (matchIndex > lastIndex) {
              parts.push({ text: option.title.substring(lastIndex, matchIndex), highlight: false });
            }
            parts.push({ text: option.title.substring(matchIndex, matchIndex + inputValue.length), highlight: true });
            lastIndex = matchIndex + inputValue.length;
            matchIndex = optionTitle.indexOf(inputValue, lastIndex);
          }

          if (lastIndex < optionTitle.length) {
            parts.push({ text: option.title.substring(lastIndex), highlight: false });
          }
        } else {
          parts.push({ text: option.title, highlight: false });
        }

        // ここでは元のprops.onKeyDownは使用せず、単にpropsをスプレッドします。
        // <li>要素は直接フォーカスを受け取らないため、ここではキーイベントは発生しません。
        return (
          <li
            {...props}
            key={option.title}
            // onKeyDown={handleKeyDown} // ここに設定しても呼ばれない
          >
            <ListItemText
              primary={
                <Box component="div">
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                        backgroundColor: part.highlight ? '#ffee58' : 'inherit',
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </Box>
              }
              secondary={option.year}
            />
          </li>
        );
      }}
    />
  );
};

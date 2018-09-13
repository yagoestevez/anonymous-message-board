const API_URL = window.location.href + 'api/books/';

$( '#new-book-form' ).submit( function ( event ) {
  event.preventDefault( );
  $.ajax( {
    method  : 'post',
    url     : API_URL,
    data    : 'title=' + $( '#new-book-input' ).val( ),
    success : data => window.location.reload( true )
  } );
} );

$( '.add-book-btn' ).click( function ( event ) {
  event.preventDefault( );
  $.ajax( {
    method  : 'post',
    url     : API_URL,
    data    : 'title=' + $( '#new-book-input' ).val( ),
    success : data => window.location.reload( true )
  } );
} );

$( '.add-review-btn' ).click( function ( event ) {
  event.preventDefault( );
  $.ajax( {
    method  : 'post',
    url     : API_URL + $( this ).data( 'id' ),
    data    : 'comment=' + $( this ).parent( ).prev( ).val( ),
    success : data => window.location.reload( true )
  } );
} );

$( '.del-book-btn' ).click( function ( event ) {
  event.preventDefault( );
  $.ajax( {
    method  : 'delete',
    url     : API_URL + $( this ).data( 'id' ),
    success : data => window.location.reload( true )
  } );
} );

$( '.del-all-books-btn' ).click( function ( event ) {
  event.preventDefault( );
  const agree = confirm( 'Are you sure you want to detroy everything...?' );
  if ( agree ) {
    $.ajax( {
      method  : 'delete',
      url     : API_URL,
      success : data => window.location.reload( true )
    } );
  } else {
    return;
  }
} );
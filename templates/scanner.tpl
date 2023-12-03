<div id="scanner-modal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p style="color: black;">Scan a QR Code</p>
    <div style="width: 100%;" id="reader"></div>
  </div>

</div>

{% if just_scanned %}
<script type="text/javascript">
window.onload = function(){
    alert('You completed a task!');
}
</script>
{% endif %}